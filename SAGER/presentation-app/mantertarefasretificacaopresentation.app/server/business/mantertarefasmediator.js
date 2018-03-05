const TarefaDAO = require('../dao/tarefadao');
const XLSX = require('xlsx');
const EventoMudancaEstadoOperativoTarefa = require('../model/eventomudancaestadooperativotarefa');
const parseEventosXlsx = require('../helpers/parseeventosxlsx');

class ManterTarefasMediator {

    constructor() {
        this.tarefaDAO = new TarefaDAO();
    }

    inserirTarefa(nomeTarefa) {
        return this.tarefaDAO.inserirTarefa(nomeTarefa);
    }

    listarTarefas() {
        return this.tarefaDAO.listarTarefas();
    }

    uploadplanilha(nomeTarefa, file) {
        let planilha = XLSX.read(file.data);
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
            eventoMudancaEstadoOperativoTarefa.idEstadoOperativo = this.getSheetValue(planilha.Sheets.eventos, 'D', i);
            eventoMudancaEstadoOperativoTarefa.idCondicaoOperativa = this.getSheetValue(planilha.Sheets.eventos, 'E', i);
            eventoMudancaEstadoOperativoTarefa.idClassificacaoOrigem = this.getSheetValue(planilha.Sheets.eventos, 'F', i);
            eventoMudancaEstadoOperativoTarefa.dataVerificada = this.getSheetValue(planilha.Sheets.eventos, 'G', i);
            eventoMudancaEstadoOperativoTarefa.potenciaDisponivel = this.getSheetValue(planilha.Sheets.eventos, 'H', i);
            eventoMudancaEstadoOperativoTarefa.operacao = this.getSheetValue(planilha.Sheets.eventos, 'I', i);
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
            this.tarefaDAO.consultarEventosRetificacaoPorNomeTarefa(nomeTarefa).then(eventosRetificacoes => {
                let parseFileTemplate = parseEventosXlsx.factory();
                parseFileTemplate.eventos = eventosRetificacoes;
                let contentXlsx = parseFileTemplate.parse();
                resolve(contentXlsx);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    excluirTarefa(tarefaId){
        return this.tarefaDAO.excluirTarefa(tarefaId);
    }


}

module.exports = ManterTarefasMediator