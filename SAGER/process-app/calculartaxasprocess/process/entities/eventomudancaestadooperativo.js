const extensions = require("../../extensions");
const BaseEntity = require("./_baseentity");

module.exports = class EventoMudancaEstadoOperativo extends BaseEntity {
    
    constructor(id, idEvento, idUge, idClassificacaoOrigem, idEstadoOperativo, idCondicaoOperativa, dataVerificada, potenciaDisponivel) {
        super();
        this.id = id;
        this.idEvento = idEvento;
        this.idUge = idUge;
        this.idClassificacaoOrigem = idClassificacaoOrigem;
        this.idEstadoOperativo = idEstadoOperativo;
        this.idCondicaoOperativa = idCondicaoOperativa;
        this.dataVerificada = dataVerificada;
        this.dataVerificadaEmSegundos = 0;
        this.potenciaDisponivel = 0;
    }

    static gerarDataVerificadaEmSegundos(evento) {
        evento.dataVerificadaEmSegundos = evento.dataVerificada ? evento.dataVerificada.getTotalSeconds() : 0;
    }
}
