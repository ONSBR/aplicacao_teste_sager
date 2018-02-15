var TipoParametro = require("../constants").TipoParametro;
var AbstractCalculoParametroEventoDiferenca = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoDiferenca;
var AbstractCalculoParametroEventoLimitacaoPotencia = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoLimitacaoPotencia;
var util = require("./utilcalculoparametro");

/**
 * @description Valida se o evento atende os critérios para contabilizar no parâmetro HS.
 * @param {EventoMudancaEstadoOperativo} evtEstOper 
 */
function validarEventoHS(evtEstOper) {
    
    return util.validarEstado_LIG_LCC_LCI_LCS(evtEstOper.idEstadoOperativo);
}

/**
 * @description RNC104 - Parâmetro de horas em serviço HS
 * @param {UnidadeGeradora} unidadeGeradora 
 * @param {PeriodoCalculo} periodoCalculo 
 */
module.exports.factory = function(unidadeGeradora, periodoCalculo) {

    var retorno;

    if (util.periodo_between_01_2000_e_09_2014(periodoCalculo)) {
        retorno = new  AbstractCalculoParametroEventoDiferenca(TipoParametro.HS, unidadeGeradora);
    } else if (util.periodo_gte_10_2014(periodoCalculo)) {
        retorno = new  AbstractCalculoParametroEventoLimitacaoPotencia(TipoParametro.HS, unidadeGeradora, true);
    }

    retorno.validarEvento = validarEventoHS;

    return retorno;
}