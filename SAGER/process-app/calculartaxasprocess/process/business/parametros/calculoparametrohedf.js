var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoLimitacaoPotencia = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoLimitacaoPotencia;
var util = require("./utilcalculoparametro");

/**
 * @description RNC114 - Parâmetro Horas Equivalentes de Desligamento Forçado – HEDF
 * Classe responsável por realizar os cálculos do tipo de parâmetro HEDF
 */
module.exports = class CalculoParametroHEDF extends AbstractCalculoParametroEventoLimitacaoPotencia {
    
    constructor(unidadeGeradora) {
        super(TipoParametro.HEDF, unidadeGeradora);
    }

    /**
     * @description Método responsável por validar os eventos de interesse do parâmetro HEDF
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    validarEvento(evtEstOper) {
        
        return util.validarEstado_LIG_LCC_LCI_LCS(evtEstOper.idEstadoOperativo) 
            && evtEstOper.idCondicaoOperativa == CondicaoOperativa.RFO
            && util.validarIndisponibilidadeResponsabilidade(evtEstOper.idClassificacaoOrigem);
    }

}
