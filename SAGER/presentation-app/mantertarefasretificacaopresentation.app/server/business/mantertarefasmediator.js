const TarefaDAO = require('../dao/tarefadao');
const EventoDAO = require('../dao/eventodao');
const XLSX = require('xlsx');
const TarefaRetificacao = require('../domain/TarefaRetificacao');
const EventoMudancaEstadoOperativoTarefa = require('../model/eventomudancaestadooperativotarefa');
const parseEventosXlsx = require('../helpers/parseeventosxlsx');
const Util = require('../helpers/util');
const EventoMudancaEstadoOperativoBusiness = require('eventos_business_rules/business/eventomudancaestadooperativobusiness');

class ManterTarefasMediator {

    constructor() {
        this.eventoMudancaEstadoOperativoBusiness = new EventoMudancaEstadoOperativoBusiness();
        this.tarefaDAO = new TarefaDAO();
        this.eventoDAO = new EventoDAO();
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
        context.dataset.eventomudancaestadooperativotarefa.collection.forEach(eventoMudancaEstadoOperativoTarefa => {
            context.dataset.eventomudancaestadooperativotarefa.delete(eventoMudancaEstadoOperativoTarefa);
        });

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
            eventoMudancaEstadoOperativoTarefa.dataVerificada = Util.excelStrToDate(this.getSheetValue(planilha.Sheets.eventos, 'H', i));
            eventoMudancaEstadoOperativoTarefa.potenciaDisponivel = parseFloat(this.getSheetValue(planilha.Sheets.eventos, 'I', i));
            eventoMudancaEstadoOperativoTarefa.eversao = parseInt(this.getSheetValue(planilha.Sheets.eventos, 'J', i));
            eventoMudancaEstadoOperativoTarefa.operacao = this.getSheetValue(planilha.Sheets.eventos, 'K', i)
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
        let ds = context.dataset;
        let tarefa = context.event.payload.tarefa;
        ds.eventomudancaestadooperativotarefa.collection.forEach(obj => {
            ds.eventomudancaestadooperativotarefa.delete(obj);
        });
        try {
            ds.tarefaretificacao.delete(tarefa);
            resolve({ "msg": "Executou o exclui" });
        } catch (e) {
            reject(e);
        };
    }

    aplicarTarefa(context, resolve, reject) {
        let eventosPlanilha = context.dataset.eventomudancaestadooperativotarefa.collection.toArray();
        this.validarEventos(eventosPlanilha);
        let minDataEventoAlterado = this.getDataMinimaEventoAlterado(eventosPlanilha);
        let maxDataEventoAlterado = this.getDataMaximaEventoAlterado(eventosPlanilha);
        this.concatenarListaDeEventos(minDataEventoAlterado, maxDataEventoAlterado, eventosPlanilha).then(eventosParaValidacao => {
            this.aplicarRegras(eventosParaValidacao);

            let eventosRetificacao = context.dataset.eventomudancaestadooperativo.collection.toArray();
            this.validarEventos(eventosRetificacao);

            eventosParaValidacao.filter(this.filterByOperacaoNotNull).forEach(eventoRetificacaoComOperacao => {
                let eventosRetificaoBD = eventosRetificacao.filter(eventoRetificacao => {
                    return eventoRetificacaoComOperacao.idEvento == eventoRetificacao.idEvento;
                });
                this.persistirEventos(context, eventoRetificacaoComOperacao, eventosRetificaoBD);
            });
            let tarefas = context.dataset.tarefaretificacao.collection.toArray();
            if (tarefas.length > 0) {
                let tarefa = context.dataset.tarefaretificacao.collection.toArray()[0];
                tarefa.situacao = 'aplicado';
                context.dataset.tarefaretificacao.update(tarefa);
            }
            resolve(minDataEventoAlterado);
        }).catch(error => { this.catchError(error, 'Aplicação da tarefa', '', reject) });
    }

    aplicarRegras(eventos) {
        // this.eventoMudancaEstadoOperativoBusiness.aplicarRegras(eventos);
    }

    async concatenarListaDeEventos(minDataEventoAlterado, maxDataEventoAlterado, eventos) {
        let eventosMenorQueData = await this.eventoDAO.consultarEventosMenorQueData(minDataEventoAlterado);
        let eventosMaiorQueData = await this.eventoDAO.consultarEventosMaiorQueData(maxDataEventoAlterado);
        return eventosMenorQueData.concat(eventos, eventosMaiorQueData);;
    }

    persistirEventos(context, eventoRetificacaoComOperacao, eventosRetificaoBD) {
        if (this.isEventoAlteracao(eventoRetificacaoComOperacao)) {
            if (eventosRetificaoBD.length > 0) {
                this.alterarEventoRetificacao(context, eventoRetificacaoComOperacao, eventosRetificaoBD[0]);
            }
        } else if (this.isEventoInclusao(eventoRetificacaoComOperacao)) {
            this.inserirEventoRetificacao(context, eventoRetificacaoComOperacao);
        } else {
            if (eventosRetificaoBD.length > 0) {
                context.dataset.eventomudancaestadooperativo.delete(eventosRetificaoBD[0]);
            }
        }
    }

    alterarEventoRetificacao(context, eventoRetificacaoComOperacao, eventoRetificaoBD) {
        eventoRetificaoBD.idEstadoOperativo = eventoRetificacaoComOperacao.idEstadoOperativo;
        eventoRetificaoBD.idClassificacaoOrigem = eventoRetificacaoComOperacao.idClassificacaoOrigem;
        eventoRetificaoBD.idCondicaoOperativa = eventoRetificacaoComOperacao.idCondicaoOperativa;
        eventoRetificaoBD.potenciaDisponivel = eventoRetificacaoComOperacao.potenciaDisponivel;
        eventoRetificaoBD.eversao++;
        context.dataset.eventomudancaestadooperativo.update(eventoRetificaoBD);
    }

    inserirEventoRetificacao(context, eventoRetificacaoComOperacao) {
        let novoEventoRetificacao = {
            _metadata: {
                type: "eventomudancaestadooperativo"
            }
        };
        novoEventoRetificacao.idUsina = eventoRetificacaoComOperacao.idUsina;
        novoEventoRetificacao.idUge = eventoRetificacaoComOperacao.idUge;
        novoEventoRetificacao.idEvento = eventoRetificacaoComOperacao.idEvento;
        novoEventoRetificacao.idEstadoOperativo = eventoRetificacaoComOperacao.idEstadoOperativo;
        novoEventoRetificacao.idCondicaoOperativa = eventoRetificacaoComOperacao.idCondicaoOperativa;
        novoEventoRetificacao.idClassificacaoOrigem = eventoRetificacaoComOperacao.idClassificacaoOrigem;
        novoEventoRetificacao.dataVerificada = eventoRetificacaoComOperacao.dataVerificada;
        novoEventoRetificacao.potenciaDisponivel = eventoRetificacaoComOperacao.potenciaDisponivel;
        novoEventoRetificacao.numONS = eventoRetificacaoComOperacao.numONS;
        novoEventoRetificacao.eversao = 1;
        context.dataset.eventomudancaestadooperativo.insert(novoEventoRetificacao);
    }

    executarRetificacao(context, resolve, reject, eventManager) {
        let menorDataEventoAlterado = context.event.payload.menorDataEventoAlterado;

        var mesFechamento = menorDataEventoAlterado.getMonth() + 1;
        var anoFechamento = menorDataEventoAlterado.getFullYear();

        this.eventoDAO.consultarFechamentosPorMesAno(mesFechamento, anoFechamento).then(fechamentosMensais => {
            if (fechamentosMensais && fechamentosMensais.length > 0) {
                fechamentosMensais.forEach(fechamento => {
                    var evento = {
                        name: "calculate.tax.request",
                        payload: { mesFechamento: fechamento.mes, anoFechamento: fechamento.ano },
                        owner: "reprocess"
                    };
                    console.log('Emitir evento de cálculo de taxa:');
                    console.log(evento);
                    eventManager.emit(evento);
                });
            }

            resolve({ msg: "OK" });

        }).catch(error => { this.catchError(error, 'consulta de fechamentos', '', reject) });
    }

    isEventoAlteracao(eventoRetificacaoComOperacao) {
        return eventoRetificacaoComOperacao.operacao == 'A' || eventoRetificacaoComOperacao.operacao == 'AA';
    }

    isEventoInclusao(eventoRetificacaoComOperacao) {
        return eventoRetificacaoComOperacao.operacao == 'I';
    }

    getDataMinimaEventoAlterado(eventosTarefa) {
        let eventosRetificacaoComOperacao = eventosTarefa.filter(this.filterByOperacaoNotNull);
        let minDataEventoAlterado = new Date();
        eventosRetificacaoComOperacao.forEach(evtRet => {
            if (evtRet.dataVerificada.getTime() < minDataEventoAlterado.getTime()) {
                minDataEventoAlterado = evtRet.dataVerificada;
            }
        });
        return minDataEventoAlterado;
    }

    getDataMaximaEventoAlterado(eventosTarefa) {
        let eventosRetificacaoComOperacao = eventosTarefa.filter(this.filterByOperacaoNotNull);
        let maxDataEventoAlterado = new Date();
        eventosRetificacaoComOperacao.forEach(evtRet => {
            if (evtRet.dataVerificada.getTime() > maxDataEventoAlterado.getTime()) {
                maxDataEventoAlterado = evtRet.dataVerificada;
            }
        });
        return maxDataEventoAlterado;
    }

    filterByOperacaoNotNull(eventoRetificacao) {
        return eventoRetificacao.operacao != undefined;
    }

    validarEventos(eventos) {
        if (!eventos || eventos.length == 0) {
            var error = new Error('Eventos de mudança de estado não encontrados.')
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