var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoDiferenca = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoDiferenca;
var AbstractCalculoParametroEventoLimitacaoPotencia = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoLimitacaoPotencia;
var util = require("./utilcalculoparametro");

/**
 * @description Valida se o evento atende os critérios para contabilizar no parâmetro HRD.
 * @param {EventoMudancaEstadoOperativo} evtEstOper 
 */
function validarEventoHRD(evtEstOper) {
    
    var condicao1 = evtEstOper.idEstadoOperativo == EstadoOperativo.DCO || evtEstOper.idEstadoOperativo == EstadoOperativo.RDP;
    
    var condicao2Estado = [EstadoOperativo.DPR, EstadoOperativo.DPA, EstadoOperativo.DUR, EstadoOperativo.DEM, 
        EstadoOperativo.DAU, EstadoOperativo.DAP].indexOf(evtEstOper.idEstadoOperativo) >= 0;

    var condicao2Origem = [ClassificacaoOrigem.GCI, ClassificacaoOrigem.GIS, 
        ClassificacaoOrigem.GIM, ClassificacaoOrigem.GVO, ClassificacaoOrigem.GMP, 
        ClassificacaoOrigem.GMT].indexOf(evtEstOper.idClassificacaoOrigem)>=0;

    return condicao1 || (condicao2Estado && condicao2Origem);
}

/**
 * @description RNC107 - Parâmetro Horas de Reserva Desligada – HRD
 * @param {UnidadeGeradora} unidadeGeradora 
 * @param {PeriodoCalculo} periodoCalculo 
 */
module.exports.factory = function(unidadeGeradora, periodoCalculo) {

    var retorno;

    if (util.periodo_between_01_2000_e_09_2014(periodoCalculo)) {
        retorno = new  AbstractCalculoParametroEventoDiferenca(TipoParametro.HRD, unidadeGeradora);
    } else if (util.periodo_gte_10_2014(periodoCalculo)) {
        retorno = new  AbstractCalculoParametroEventoLimitacaoPotencia(TipoParametro.HRD, unidadeGeradora, true);
    }

    retorno.validarEvento = validarEventoHRD;

    return retorno;
}