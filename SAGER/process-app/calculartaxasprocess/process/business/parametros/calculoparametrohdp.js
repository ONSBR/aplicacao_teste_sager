var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoDiferenca = require("./_abstractcalculoparametro").AbstractCalculoParametroEventoDiferenca;
var util = require("./utilcalculoparametro");

/**
 * @description RNC110 - Parâmetro Horas de Desligamento Programado – HDP
 * Classe responsável por realizar os cálculos do tipo de parâmetro HDP
 */
class CalculoParametroHDP extends AbstractCalculoParametroEventoDiferenca {
    
    constructor(unidadeGeradora) {
        super(TipoParametro.HDP, unidadeGeradora);
    }

    /**
     * @description Método responsável por validar os eventos de interesse do parâmetro HDP
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    validarEvento(evtEstOper) {
        // TODO teste reprodução: if (evtEstOper.idClassificacaoOrigem == 'GAC') evtEstOper.idClassificacaoOrigem = 'TES';
        return (evtEstOper.idEstadoOperativo == EstadoOperativo.DPR 
                    || evtEstOper.idEstadoOperativo == EstadoOperativo.DUR
                    || evtEstOper.idEstadoOperativo == EstadoOperativo.DPA
                    || evtEstOper.idEstadoOperativo == EstadoOperativo.DCA) && 
                util.validarIndisponibilidadeResponsabilidade(evtEstOper.idClassificacaoOrigem);
    }
}

/**
 * @description RNC110 - Parâmetro Horas de Desligamento Programado – HDP
 * @param {UnidadeGeradora} unidadeGeradora 
 * @param {PeriodoCalculo} periodoCalculo 
 */
module.exports.factory = function (unidadeGeradora, periodoCalculo) {
    return new CalculoParametroHDP(unidadeGeradora);
}