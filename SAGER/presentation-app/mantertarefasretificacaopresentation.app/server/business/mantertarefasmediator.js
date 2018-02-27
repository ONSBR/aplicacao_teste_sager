const TarefaDAO = require('../dao/tarefadao');
const XLSX = require('xlsx');
const EventoMudancaEstadoOperativoTarefa = require('../model/eventomudancaestadooperativotarefa');

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

    uploadplanilha(request) {
        let nomeTarefa = request.body.nomeTarefa;
        let planilha = XLSX.read(request.files.planilha.data);
        let sheetLength = planilha.Sheets.eventos['!ref'].split(':')[1].substring(1);

        let eventosRetificacao = [];
        for (let i = 3; i <= sheetLength; i++) {
            let eventoMudancaEstadoOperativoTarefa = new EventoMudancaEstadoOperativoTarefa();
            eventoMudancaEstadoOperativoTarefa.nomeTarefa = nomeTarefa;
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

        return this.tarefaDAO.inserirTarefasRetificacaoOperacao(eventosRetificacao);
    }

    getSheetValue(sheet, column, row) {
        let value = sheet[column + row];
        if(value) {
            return value.v;
        } else {
            return null;
        }
    }

}

module.exports = ManterTarefasMediator