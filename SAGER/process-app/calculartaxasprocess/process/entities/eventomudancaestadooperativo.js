const extensions = require("../../extensions");
const BaseEntity = require("./_baseentity");

/**
 * @class EventoMudancaEstadoOperativo
 * @description Entidade que representa o evento da mudança de estado operativo da undidade geradora.
 */
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

    /**
     * @method gerarDataVerificadaEmSegundos
     * @param {EventoMudancaEstadoOperativo} evento
     * @description Método para gerar o campo de data verificada equivalente em segundos, para usar em cálculos e comparações,
     * na mais baixa unidade de tempo considerada nos cálculos.
     */
    static gerarDataVerificadaEmSegundos(evento) {
        console.log(JSON.stringify(evento, null, 4));
        //TODO: refatorar
        if (typeof evento.dataVerificada === "string"){
            evento.dataVerificada = new Date(evento.dataVerificada.replace("00:00:00 GMT",""));
        }
        evento.dataVerificadaEmSegundos = evento.dataVerificada &&
         typeof evento.dataVerificada.getTotalSeconds === "function" ? evento.dataVerificada.getTotalSeconds() : 0;
    }
}
