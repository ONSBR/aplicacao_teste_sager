const TarefaDAO = require('../dao/tarefadao');
const XLSX = require('xlsx');
const TarefaRetificacao = require('../domain/TarefaRetificacao');
const EventoMudancaEstadoOperativoTarefa = require('../model/eventomudancaestadooperativotarefa');
const parseEventosXlsx = require('../helpers/parseeventosxlsx');
var moment = require('moment');
const formatDateExcel = "DD/MM/YYYY HH:mm:ss";

class ManterTarefasMediator {

    constructor() {
        this.tarefaDAO = new TarefaDAO();
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
            eventoMudancaEstadoOperativoTarefa.dataVerificada = moment(this.getSheetValue(planilha.Sheets.eventos, 'G', i), formatDateExcel).toDate();
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


}

module.exports = ManterTarefasMediator