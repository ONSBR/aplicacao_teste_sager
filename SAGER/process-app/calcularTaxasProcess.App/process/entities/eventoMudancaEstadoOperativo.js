const extensions = require("../../extensions");
const BaseEntity = require("./_baseEntity");

module.exports = class EventoMudancaEstadoOperativo extends BaseEntity {
    
    constructor(id, idEvento, idUge, idClassificacaoOrigem, idTipoEstadoOperativo, idCondicaoOperativa, dataVerificada, potenciaDisponivel) {
        super("evento-mudanca-estado-operativo");
        this.id = id;
        this.idEvento = idEvento;
        this.idUge = idUge;
        this.idClassificacaoOrigem = idClassificacaoOrigem;
        this.idTipoEstadoOperativo = idTipoEstadoOperativo;
        this.idCondicaoOperativa = idCondicaoOperativa;
        this.dataVerificada = dataVerificada;
        this.dataVerificadaEmSegundos = 0;
        this.potenciaDisponivel = 0;
    }

    static gerarDataVerificadaEmSegundos(evento) {
        evento.dataVerificadaEmSegundos = evento.dataVerificada ? evento.dataVerificada.getTotalSeconds() : 0;
    }
}
