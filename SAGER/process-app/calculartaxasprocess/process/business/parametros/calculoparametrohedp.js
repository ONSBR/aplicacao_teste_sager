var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoLimitacaoPotencia = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoLimitacaoPotencia;
var util = require("./utilcalculoparametro");

/**
 * @description RNC113 - Parâmetro Horas Equivalentes de Desligamento Programado – HEDP
 * Classe responsável por realizar os cálculos do tipo de parâmetro HEDP
 */
class CalculoParametroHEDP extends AbstractCalculoParametroEventoLimitacaoPotencia {
    
    constructor(unidadeGeradora) {
        super(TipoParametro.HEDP, unidadeGeradora);
    }

    /**
     * @description Método responsável por validar os eventos de interesse do parâmetro HEDP
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    validarEvento(evtEstOper) {
        
        return (util.validarEstado_LIG_LCC_LCI_LCS(evtEstOper.idEstadoOperativo)) 
            && evtEstOper.idCondicaoOperativa == CondicaoOperativa.RPR
            && util.validarIndisponibilidadeResponsabilidade(evtEstOper.idClassificacaoOrigem);
    }
}

/**
 * @description RNC113 - Parâmetro Horas Equivalentes de Desligamento Programado – HEDP
 * @param {UnidadeGeradora} unidadeGeradora 
 * @param {PeriodoCalculo} periodoCalculo 
 */
module.exports.factory = function (unidadeGeradora, periodoCalculo) {
    return new CalculoParametroHEDP(unidadeGeradora);
}