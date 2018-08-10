const TarefaDAO = require('../dao/tarefadao');
const EventoDAO = require('../dao/eventodao');
const XLSX = require('xlsx');
const TarefaRetificacao = require('../domain/TarefaRetificacao');
const EventoMudancaEstadoOperativoTarefa = require('../model/eventomudancaestadooperativotarefa');
const parseEventosXlsx = require('../helpers/parseeventosxlsx');
const Util = require('../helpers/util');
const EventoMudancaEstadoOperativoBusiness = require('eventos_business_rules/business/eventomudancaestadooperativobusiness');
const extensions = require("./extensions");

class ManterTarefasMediator {

    constructor() {
        this.eventoMudancaEstadoOperativoBusiness = new EventoMudancaEstadoOperativoBusiness();
        this.tarefaDAO = new TarefaDAO();
        this.eventoDAO = new EventoDAO();
        this.parseEventosXlsx = parseEventosXlsx;
    }

    inserirTarefa(context, resolve, reject) {
        let entity = new TarefaRetificacao(context.event.payload.nomeTarefa);
        entity.situacao = 'pendente';
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

        let tarefas = context.dataset.tarefaretificacao.collection.toArray();

        if(tarefas.length > 0) {
            tarefas[0].situacao = 'iniciada';
            context.dataset.tarefaretificacao.update(tarefas[0]);
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
        let tarefas = context.dataset.tarefaretificacao.collection.toArray();
        let ugesBd = context.dataset.unidadegeradora.collection.toArray();

        this.validarQuantidadeEventos(eventosPlanilha);

        let uges = new Set();
        context.dataset.eventomudancaestadooperativotarefa.collection.toArray().forEach(evento => {
            if(evento.idUge != undefined) {
                ugesBd.filter(ugeBd => {
                    return ugeBd.idUge == evento.idUge;
                }).forEach(ugeBd => {
                    uges.add(ugeBd);
                });    
            }
        });

        let eventosRetificacaoComOperacao = eventosPlanilha.filter(this.filterByOperacaoNotNull);
        this.validarEventosPre(uges, eventosRetificacaoComOperacao, tarefas, context.dataset, reject);
        
        eventosRetificacaoComOperacao.forEach(eventoRetificacaoComOperacao => {
            let eventosRetificaoBD = context.dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoRetificacao => {
                return eventoRetificacaoComOperacao.idEvento == eventoRetificacao.idEvento;
            });

            this.persistirEventos(context, eventoRetificacaoComOperacao, eventosRetificaoBD);
        });

        if (tarefas.length > 0) {
            let tarefa = tarefas[0];
            tarefa.situacao = 'aplicado';
            context.dataset.tarefaretificacao.update(tarefa);
        }

        this.validarEventosPos(uges, context.dataset, tarefas, reject);

        resolve();
    }

    validarEventosPre(uges, eventosRetificacaoBD, tarefas, dataset, reject) {
        uges.forEach(uge => {
            console.log('Validar UGE PRE');
            console.log(uge.idUge);

            let eventosPorUge = eventosRetificacaoBD.filter(eventoFiltro => {
                return uge.idUge == eventoFiltro.idUge;
            });
            eventosPorUge.sort(this.sortByData);
                        
            let eventosBD = dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoFiltro => {
                return uge.idUge == eventoFiltro.idUge;
            });
            eventosBD.sort(this.sortByData);
            try {
                this.eventoMudancaEstadoOperativoBusiness.aplicarRegrasPre(eventosPorUge, eventosBD, uge, dataset);
            } catch(error) {
                this.catchError(error, 'aplicar', tarefas[0].nome, reject);
            }
        });
    }

    validarEventosPos(uges, dataset, tarefas, reject) {
        uges.forEach(uge => {
            console.log('Validar UGE POS');
            console.log(uge.idUge);
            
            let eventosPorUge = this.groupByUge(dataset, uge);
            try {
                this.eventoMudancaEstadoOperativoBusiness.aplicarRegrasPos(eventosPorUge, uge, dataset);
            } catch(error) {
                this.catchError(error, 'aplicar', tarefas[0].nome, reject);
            }
        });
    }

    groupByUge(dataset, uge) {
        let eventosPorUge = dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoFiltro => {
            return uge.idUge == eventoFiltro.idUge;
        });
        eventosPorUge.sort(this.sortByData);
        return eventosPorUge;
    }

    sortByData(eventoA, eventoB) {
        if(eventoA.dataVerificada.getTotalSeconds() < eventoB.dataVerificada.getTotalSeconds()){
            return -1;
        }

        if(eventoA.dataVerificada.getTotalSeconds() > eventoB.dataVerificada.getTotalSeconds()){
            return 1;
        }

        if(eventoA.dataVerificada.getTotalSeconds() == eventoB.dataVerificada.getTotalSeconds()) {
            if(parseInt(eventoA.idEvento) < parseInt(eventoB.idEvento)) {
                return -1;
            }

            if(parseInt(eventoA.idEvento) > parseInt(eventoB.idEvento)) {
                return 1;
            }
        }

        return 0;
    }

    async concatenarListaDeEventos(minDataEventoAlterado, maxDataEventoAlterado, eventos) {
        let eventosMenorQueData = await this.eventoDAO.consultarEventosMenorQueData(minDataEventoAlterado);
        let eventosMaiorQueData = await this.eventoDAO.consultarEventosMaiorQueData(maxDataEventoAlterado);
        return eventosMenorQueData.concat(eventos, eventosMaiorQueData);
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
        eventoRetificaoBD.idUsina = eventoRetificacaoComOperacao.idUsina;
        eventoRetificaoBD.idUge = eventoRetificacaoComOperacao.idUge;
        eventoRetificaoBD.idEvento = eventoRetificacaoComOperacao.idEvento;
        eventoRetificaoBD.idEstadoOperativo = eventoRetificacaoComOperacao.idEstadoOperativo;
        eventoRetificaoBD.idCondicaoOperativa = eventoRetificacaoComOperacao.idCondicaoOperativa;
        eventoRetificaoBD.dataVerificada = eventoRetificacaoComOperacao.dataVerificada;
        eventoRetificaoBD.potenciaDisponivel = eventoRetificacaoComOperacao.potenciaDisponivel;
        eventoRetificaoBD.numONS = eventoRetificacaoComOperacao.numONS;
        eventoRetificaoBD.idClassificacaoOrigem = eventoRetificacaoComOperacao.idClassificacaoOrigem;
        eventoRetificaoBD.eversao++;
        context.dataset.eventomudancaestadooperativo.update(eventoRetificaoBD);
    }

    inserirEventoRetificacao(context, eventoRetificacaoComOperacao) {
        console.log('inserir');
        
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
        novoEventoRetificacao.dataVerificada = eventoRetificacaoComOperacao.dataVerificada;
        novoEventoRetificacao.potenciaDisponivel = eventoRetificacaoComOperacao.potenciaDisponivel;
        novoEventoRetificacao.numONS = eventoRetificacaoComOperacao.numONS;
        novoEventoRetificacao.idClassificacaoOrigem = eventoRetificacaoComOperacao.idClassificacaoOrigem;
        novoEventoRetificacao.eversao = 1;
        context.dataset.eventomudancaestadooperativo.insert(novoEventoRetificacao);
    }

    isEventoAlteracao(eventoRetificacaoComOperacao) {
        return eventoRetificacaoComOperacao.operacao == 'A' || eventoRetificacaoComOperacao.operacao == 'AA';
    }

    isEventoInclusao(eventoRetificacaoComOperacao) {
        return eventoRetificacaoComOperacao.operacao == 'I';
    }

    getDataMinimaEventoAlterado(eventosTarefa) {
        let eventosRetificacaoComOperacao = eventosTarefa.filter(this.filterByOperacaoNotNull);
        let minDataEventoAlterado = this.getPrimeiraData(eventosRetificacaoComOperacao);
        eventosRetificacaoComOperacao.forEach(evtRet => {
            if (evtRet.dataVerificada.getTime() < minDataEventoAlterado.getTime()) {
                minDataEventoAlterado = evtRet.dataVerificada;
            }
        });
        return minDataEventoAlterado;
    }

    getDataMaximaEventoAlterado(eventosTarefa) {
        let eventosRetificacaoComOperacao = eventosTarefa.filter(this.filterByOperacaoNotNull);
        let maxDataEventoAlterado = this.getPrimeiraData(eventosRetificacaoComOperacao);
        eventosRetificacaoComOperacao.forEach(evtRet => {
            if (evtRet.dataVerificada.getTime() > maxDataEventoAlterado.getTime()) {
                maxDataEventoAlterado = evtRet.dataVerificada;
            }
        });
        return maxDataEventoAlterado;
    }

    getPrimeiraData(eventos) {
        return eventos[0].dataVerificada;
    }

    filterByOperacaoNotNull(eventoRetificacao) {
        return eventoRetificacao.operacao != undefined;
    }

    validarQuantidadeEventos(eventos) {
        if (!eventos || eventos.length == 0) {
            let error = new Error('Eventos de retificação de mudança de estado não encontrados.')
            throw error;
        }
    }

    catchError(error, msgPart, nomeTarefa, reject) {
        console.log(`Erro ao executar [${msgPart}] ao aplicar retificação[${nomeTarefa}]: ${error.message}`);
        if (reject) {
            reject(error);
        }
    }
}

module.exports = ManterTarefasMediator