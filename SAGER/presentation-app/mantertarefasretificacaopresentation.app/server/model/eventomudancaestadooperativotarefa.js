class EventoMudancaEstadoOperativoTarefa {

    constructor(idEvento, nomeTarefa, idUge, idClassificacaoOrigem, idEstadoOperativo, idCondicaoOperativa, 
        dataVerificada, potenciaDisponivel, operacao) {
            this.idEvento = idEvento;
            this.nomeTarefa = nomeTarefa;
            this.idUge = idUge;
            this.idClassificacaoOrigem = idClassificacaoOrigem;
            this.idEstadoOperativo = idEstadoOperativo;
            this.idCondicaoOperativa = idCondicaoOperativa;
            this.dataVerificada = dataVerificada;
            this.potenciaDisponivel = potenciaDisponivel;
            this.operacao = operacao;
    }

}

module.exports = EventoMudancaEstadoOperativoTarefa