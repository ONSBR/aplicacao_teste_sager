var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoLimitacaoPotencia = require("./_abstractCalculoParametro").AbstractCalculoParametroEventoLimitacaoPotencia;
var util = require("./utilCalculoParametro");

/**
 * @description RNC113 - Parâmetro Horas Equivalentes de Desligamento Programado – HEDP
 * Classe responsável por realizar os cálculos do tipo de parâmetro HEDP
 */
module.exports = class CalculoParametroHEDP extends AbstractCalculoParametroEventoLimitacaoPotencia {
    
    constructor(unidadeGeradora) {
        super(TipoParametro.HEDP, unidadeGeradora);
    }

    /**
     * @description Método responsável por validar os eventos de interesse do parâmetro HEDP
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    validarEvento(evtEstOper) {
        
        // TODO semelhante ao HEDF, validar com Talita

        return (util.validarEstado_LIG_LCC_LCI_LCS(evtEstOper.idEstadoOperativo)) 
            && evtEstOper.idCondicaoOperativa == CondicaoOperativa.RPR
            && util.validarIndisponibilidadeResponsabilidade(evtEstOper.idClassificacaoOrigem);
    }
}
