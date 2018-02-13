var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoDiferenca = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoDiferenca;
var util = require("./utilcalculoparametro");

/**
 * @description RNC114 - Parâmetro Horas Equivalentes de Desligamento Forçado – HDCE
 * Classe responsável por realizar os cálculos do tipo de parâmetro HDCE
 */
class CalculoParametroHDCE extends AbstractCalculoParametroEventoDiferenca {

    constructor(unidadeGeradora) {
        super(TipoParametro.HDCE, unidadeGeradora);
    }

    /**
     * @description Método responsável por validar os eventos de interesse do parâmetro HDCE
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    validarEvento(evtEstOper) {

        var condicaoHDCE1 = evtEstOper.idEstadoOperativo == EstadoOperativo.DAP;

        var condicaoHDCE2 = (evtEstOper.idEstadoOperativo == EstadoOperativo.DPR || evtEstOper.idEstadoOperativo == EstadoOperativo.DUR
            || evtEstOper.idEstadoOperativo == EstadoOperativo.DEM || evtEstOper.idEstadoOperativo == EstadoOperativo.DPA
            || evtEstOper.idEstadoOperativo == EstadoOperativo.DAU) &&
            util.validarIndisponibilidadeNaoResponsabilidade(evtEstOper.idClassificacaoOrigem);

        var condicaoHDCE3 = evtEstOper.idEstadoOperativo == EstadoOperativo.DCA && evtEstOper.idClassificacaoOrigem == ClassificacaoOrigem.GCI;

        return condicaoHDCE1 || condicaoHDCE2 || condicaoHDCE3;
    }
}

/**
 * @description RNC114 - Parâmetro Horas Equivalentes de Desligamento Forçado – HDCE
 * @param {UnidadeGeradora} unidadeGeradora 
 * @param {PeriodoCalculo} periodoCalculo 
 */
module.exports.factory = function (unidadeGeradora, periodoCalculo) {
    return new CalculoParametroHDCE(unidadeGeradora);
}