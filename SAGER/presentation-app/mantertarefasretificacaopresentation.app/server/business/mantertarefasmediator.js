const TarefaDAO = require('../dao/tarefadao');
const EventoDAO = require('../dao/eventodao');
const XLSX = require('xlsx');
const TarefaRetificacao = require('../domain/TarefaRetificacao');
const EventoMudancaEstadoOperativoTarefa = require('../model/eventomudancaestadooperativotarefa');
const parseEventosXlsx = require('../helpers/parseeventosxlsx');

class ManterTarefasMediator {

    constructor() {
        this.parseEventosXlsx = parseEventosXlsx;
    }

    inserirTarefa(context, resolve, reject) {
        var entity = new TarefaRetificacao(context.event.payload.nomeTarefa);
        context.dataset.tarefaretificacao.insert(entity);
        resolve(entity);
    }

    listarTarefas() {
        return this.tarefaDAO.listarTarefas();
    }

    uploadPlanilha(context, resolve, reject) {
        let nomeTarefa = context.event.payload.nomeTarefa;
        let planilha = XLSX.read(new Buffer(context.event.payload.planilha.data));
        let sheetLength = planilha.Sheets.eventos['!ref'].split(':')[1].substring(1);
        let retificacoes = [];
        for (let i = 3; i <= sheetLength; i++) {
            let eventoMudancaEstadoOperativoTarefa = new EventoMudancaEstadoOperativoTarefa();
            eventoMudancaEstadoOperativoTarefa.nomeTarefa = nomeTarefa;
            eventoMudancaEstadoOperativoTarefa.idUsina = this.getSheetValue(planilha.Sheets.eventos, 'A', i);
            eventoMudancaEstadoOperativoTarefa.idUge = this.getSheetValue(planilha.Sheets.eventos, 'B', i);
            eventoMudancaEstadoOperativoTarefa.idEvento = this.getSheetValue(planilha.Sheets.eventos, 'C', i);
            eventoMudancaEstadoOperativoTarefa.idEstadoOperativo = this.getSheetValue(planilha.Sheets.eventos, 'D', i);
            eventoMudancaEstadoOperativoTarefa.idCondicaoOperativa = this.getSheetValue(planilha.Sheets.eventos, 'E', i);
            eventoMudancaEstadoOperativoTarefa.idClassificacaoOrigem = this.getSheetValue(planilha.Sheets.eventos, 'F', i);
            eventoMudancaEstadoOperativoTarefa.dataVerificada = Util.excelStrToDate(this.getSheetValue(planilha.Sheets.eventos, 'G', i));;
            eventoMudancaEstadoOperativoTarefa.potenciaDisponivel = this.getSheetValue(planilha.Sheets.eventos, 'H', i);
            eventoMudancaEstadoOperativoTarefa.operacao = this.getSheetValue(planilha.Sheets.eventos, 'I', i);
            context.dataset.eventomudancaestadooperativotarefa.insert(eventoMudancaEstadoOperativoTarefa);
            retificacoes.push(eventoMudancaEstadoOperativoTarefa);
        }

        resolve(retificacoes);
    }
    
    getSheetValue(sheet, column, row) {
        let value = sheet[column + row];
        if (value) {
            return value.v;
        } else {
            return null;
        }
    }

    downloadPlanilha(nomeTarefa) {
        return new Promise((resolve, reject) => {
            try {
                this.tarefaDAO.consultarEventosRetificacaoPorNomeTarefa(nomeTarefa).then(eventosRetificacoes => {
                    let parseFileTemplate = this.parseEventosXlsx.factory();
                    parseFileTemplate.eventos = eventosRetificacoes;
                    let contentXlsx = parseFileTemplate.parse();
                    resolve(contentXlsx);
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    excluirTarefa(context, resolve, reject) {
        var ds = context.dataset;
        var tarefa = context.event.payload.tarefa;
        ds.eventomudancaestadooperativotarefa.collection.forEach(obj => {
            ds.eventomudancaestadooperativotarefa.delete(obj);
        });
        try{
            ds.tarefaretificacao.delete(tarefa);
            resolve({"msg":"Executou o exclui"});
        }catch(e){
            reject(e);
        };
    }

    aplicarTarefa(nomeTarefa) {

        return new Promise((resolve, reject) => {
            try {

                var listapersist = [];

                this.tarefaDAO.obterRetificacaoPorNome(nomeTarefa).then(arrayTarefa => {
                    
                    var tarefa = arrayTarefa && arrayTarefa.length > 0 ? arrayTarefa[0] : null;

                    if (tarefa) {
                        
                        this.tarefaDAO.consultarEventosRetificacaoPorNomeTarefa(nomeTarefa).then(dataEvt => {
                            
                            if (dataEvt && dataEvt.length > 0) {

                                var eventosRetificacoes = Enumerable.from(dataEvt).where(
                                    evtRet => { return (evtRet.operacao? true: false) });
                                
                                var evtRectIds = eventosRetificacoes.select(evtRet => {
                                    return evtRet.idEvento;
                                });
                                var minDataEventoAlterado = new Date();
                                eventosRetificacoes.forEach(evtRet => {
                                    if (evtRet.dataVerificada.getTime() < minDataEventoAlterado.getTime()) {
                                        minDataEventoAlterado = evtRet.dataVerificada;
                                    }
                                });

                                this.eventoDAO.consultarEventoMudancaEstadoPorIds(evtRectIds).then(evts => {

                                    this.validarEventos(evts);

                                    var eventos = Enumerable.from(evts ? evts : []);
                                    
                                    eventosRetificacoes.forEach(evtRet => {

                                        var evtEstado = eventos.firstOrDefault(evt => { return evtRet.idEvento == evt.idEvento })
                                        
                                        if (evtEstado) {
                                            evtEstado.idEstadoOperativo = evtRet.idEstadoOperativo;
                                            evtEstado.idClassificacaoOrigem = evtRet.idClassificacaoOrigem;
                                            evtEstado.idCondicaoOperativa = evtRet.idCondicaoOperativa;
                                            evtEstado.potenciaDisponivel = evtRet.potenciaDisponivel;
                                            evtEstado._metadata.changeTrack = CHANGETRACK_UPDATE;
                                            
                                            listapersist.push(evtEstado);
                                        } 

                                    });
                                    
                                    tarefa.situacao = "aplicado";
                                    tarefa._metadata.changeTrack = CHANGETRACK_UPDATE;
                                    listapersist.push(tarefa);
                                    
                                    this.eventoDAO.persistEventosMudancaEstado(listapersist).then(persisted => {

                                        console.log("persisted[" + persisted.length + "]: " + persisted);

                                        var mesFechamento = minDataEventoAlterado.getMonth() + 1;
                                        var anoFechamento =  minDataEventoAlterado.getYear();

                                        // obtem fechamentos
                                        this.eventoDAO.consultarFechamentosPorMesAno(mesFechamento, anoFechamento).then(fechs => {

                                            if (fechs && fechs.length > 0) {
                                                
                                                var fechamentos = Enumerable.from(fechs);
                                                
                                                fechamentos.forEach(fch => {
                                                    var evento = {
                                                        name: "calculate.tax.request",
                                                        payload: { mesFechamento: fch.mes, anoFechamento: fch.ano },
                                                        owner: "reprocess"
                                                    };

                                                    this.eventPromiseHelper.putEventPromise(evento);
                                                });    
                                            }
                                            resolve({msg: "OK"});

                                        }).catch(error => { this.catchError(error, 'consulta de fechamentos', nomeTarefa, reject) });

                                    }).catch(error => { this.catchError(error, 'atualização de eventos', nomeTarefa, reject) });
                    
                                }).catch(error => { this.catchError(error, 'consulta de eventos', nomeTarefa, reject) });
                                
                            } else {
                                throw new Error(`Não encontrados eventos da retificação[${nomeTarefa}].`);
                            }

                        }).catch(error => { this.catchError(error, 'eventos da retificação', nomeTarefa, reject) });
                    } else {
                        throw new Error(`Não encontrada retificação[${nomeTarefa}].`);
                    }

                }).catch(error => { this.catchError(error, 'obtenção de tarefa', nomeTarefa, reject) });

            } catch (error) {
                console.log(error);
                reject(error);
            }
        });

    }

    validarEventos(eventos) {
        if (!eventos || eventos.length == 0) {
            var error = new Error(`Eventos de mudança de estado não encontrados.`)
            throw error;
        }
    }

    catchError(error, msgPart, nomeTarefa, reject) {
        console.log(`Erro ao executar [${msgPart}] ao aplicar retificação[${nomeTarefa}]: ${error.toString()}`);
        if (reject) {
            reject(error);
        }
    }
}

module.exports = ManterTarefasMediator