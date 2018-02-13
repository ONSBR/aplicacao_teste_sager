var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoDiferenca = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoDiferenca;
var util = require("./utilcalculoparametro");

/**
 * @description RNC111 - Parâmetro Horas de Desligamento Forçado – HDF
 * Classe responsável por realizar os cálculos do tipo de parâmetro HDF
 */
class CalculoParametroHDF extends AbstractCalculoParametroEventoDiferenca {

    constructor(unidadeGeradora) {
        super(TipoParametro.HDF, unidadeGeradora);
    }

    /**
     * @description Método responsável por validar os eventos de interesse do parâmetro HDF
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    validarEvento(evtEstOper) {
        
        return (evtEstOper.idEstadoOperativo == EstadoOperativo.DEM 
                || evtEstOper.idEstadoOperativo == EstadoOperativo.DAU) && 
            util.validarIndisponibilidadeResponsabilidade(evtEstOper.idClassificacaoOrigem);
    }
}

/**
 * @description RNC111 - Parâmetro Horas de Desligamento Forçado – HDF
 * @param {UnidadeGeradora} unidadeGeradora 
 * @param {PeriodoCalculo} periodoCalculo 
 */
module.exports.factory = function (unidadeGeradora, periodoCalculo) {
    return new CalculoParametroHDF(unidadeGeradora);
}