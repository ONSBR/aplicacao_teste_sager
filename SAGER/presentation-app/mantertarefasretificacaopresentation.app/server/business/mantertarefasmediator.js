const TarefaDAO = require('../dao/tarefadao');
const EventoDAO = require('../dao/eventodao');
const XLSX = require('xlsx');
const EventoMudancaEstadoOperativoTarefa = require('../model/eventomudancaestadooperativotarefa');
const parseEventosXlsx = require('../helpers/parseeventosxlsx');
const EventPromiseHelper = require('../helpers/eventpromisehelper');
const Enumerable = require('linq');

const CHANGETRACK_CREATE = "create";
const CHANGETRACK_UPDATE = "update";
const CHANGETRACK_DELETE = "destroy";

class ManterTarefasMediator {

    constructor() {
        this.tarefaDAO = new TarefaDAO();
        this.eventoDAO = new EventoDAO();
        this.XLSX = XLSX;
        this.parseEventosXlsx = parseEventosXlsx;
        this.eventPromiseHelper = new EventPromiseHelper();
    }

    inserirTarefa(nomeTarefa) {
        return this.tarefaDAO.inserirTarefa(nomeTarefa);
    }

    listarTarefas() {
        return this.tarefaDAO.listarTarefas();
    }

    uploadplanilha(nomeTarefa, file) {
        let planilha = this.XLSX.read(file.data);
        return this.tarefaDAO.inserirEventosRetificacao(this.preencherEventosRetificacaoAPartirPlanilha(nomeTarefa, planilha));
    }

    preencherEventosRetificacaoAPartirPlanilha(nomeTarefa, planilha) {
        let eventosRetificacao = [];
        let sheetLength = planilha.Sheets.eventos['!ref'].split(':')[1].substring(1);
        for (let i = 3; i <= sheetLength; i++) {
            let eventoMudancaEstadoOperativoTarefa = new EventoMudancaEstadoOperativoTarefa();
            eventoMudancaEstadoOperativoTarefa.nomeTarefa = nomeTarefa;
            eventoMudancaEstadoOperativoTarefa.idUsina = this.getSheetValue(planilha.Sheets.eventos, 'A', i);
            eventoMudancaEstadoOperativoTarefa.idUge = this.getSheetValue(planilha.Sheets.eventos, 'B', i);
            eventoMudancaEstadoOperativoTarefa.idEvento = this.getSheetValue(planilha.Sheets.eventos, 'C', i);
            eventoMudancaEstadoOperativoTarefa.numONS = this.getSheetValue(planilha.Sheets.eventos, 'D', i);
            eventoMudancaEstadoOperativoTarefa.idEstadoOperativo = this.getSheetValue(planilha.Sheets.eventos, 'E', i);
            eventoMudancaEstadoOperativoTarefa.idCondicaoOperativa = this.getSheetValue(planilha.Sheets.eventos, 'F', i);
            eventoMudancaEstadoOperativoTarefa.idClassificacaoOrigem = this.getSheetValue(planilha.Sheets.eventos, 'G', i);
            eventoMudancaEstadoOperativoTarefa.dataVerificada = this.getSheetValue(planilha.Sheets.eventos, 'H', i);
            eventoMudancaEstadoOperativoTarefa.potenciaDisponivel = parseFloat(this.getSheetValue(planilha.Sheets.eventos, 'I', i));
            eventoMudancaEstadoOperativoTarefa.eversao = parseInt(this.getSheetValue(planilha.Sheets.eventos, 'J', i));
            eventoMudancaEstadoOperativoTarefa.operacao = this.getSheetValue(planilha.Sheets.eventos, 'K', i);
            
            eventosRetificacao.push(eventoMudancaEstadoOperativoTarefa);
        }
        return eventosRetificacao;
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

    excluirTarefa(tarefa) {
        return new Promise((resolve, reject) => {
            try {
                this.tarefaDAO.consultarEventosRetificacaoPorNomeTarefa(tarefa.nome).then(eventos => {
                    let deleteEventos = this.tarefaDAO.excluirTarefa(tarefa.id, eventos);
                    resolve(deleteEventos);
                });
            } catch (error) {
                console.log(`Erro ao excluir tarefa: ${error}`);
                reject(error);
            }
        });
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
                                        
                                        if (evtEstado && evtRet.operacao == 'A' || evtRet.operacao == 'E') {

                                            if (evtRet.operacao == 'A') {
                                                console.log('evtEstado.dataverificada: ' +JSON.stringify(evtEstado.dataVerificada) + 
                                                    ', evtRet.dataverificada: ' + JSON.stringify(evtRet.dataVerificada));
                                                evtEstado.idEstadoOperativo = evtRet.idEstadoOperativo;
                                                evtEstado.idClassificacaoOrigem = evtRet.idClassificacaoOrigem;
                                                evtEstado.idCondicaoOperativa = evtRet.idCondicaoOperativa;
                                                evtEstado.potenciaDisponivel = evtRet.potenciaDisponivel;
                                                evtEstado.eversao++;
                                                evtEstado._metadata.changeTrack = CHANGETRACK_UPDATE;
                                            }  else {
                                                evtEstado._metadata.changeTrack = CHANGETRACK_DELETE;
                                            }
                                            listapersist.push(evtEstado);
                                        }
                                        else if (evtRet.operacao == 'I') {
                                            
                                            evtEstado = { _metadata: { 
                                                changeTrack: CHANGETRACK_CREATE, 
                                                type: "eventomudancaestadooperativo" 
                                            } };
                                            evtEstado.idUsina = evtRet.idUsina;
                                            evtEstado.idUge = evtRet.idUge;
                                            evtEstado.idEvento = evtRet.idEvento;
                                            evtEstado.idEstadoOperativo = evtRet.idEstadoOperativo;
                                            evtEstado.idCondicaoOperativa = evtRet.idCondicaoOperativa;
                                            evtEstado.idClassificacaoOrigem = evtRet.idClassificacaoOrigem;
                                            evtEstado.dataVerificada = evtRet.dataVerificada;
                                            evtEstado.potenciaDisponivel = evtRet.potenciaDisponivel;
                                            evtEstado.numONS = evtRet.numONS;
                                            evtEstado.eversao = 1;

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