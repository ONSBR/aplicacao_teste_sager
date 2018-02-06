var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoDiferenca = require("./_abstractCalculoParametro").AbstractCalculoParametroEventoDiferenca;
var util = require("./utilCalculoParametro");

/**
 * @description RNC110 - Parâmetro Horas de Desligamento Programado – HDP
 * Classe responsável por realizar os cálculos do tipo de parâmetro HDP
 */
module.exports = class CalculoParametroHDP extends AbstractCalculoParametroEventoDiferenca {
    
    constructor(unidadeGeradora) {
        super(TipoParametro.HDP, unidadeGeradora);
    }

    /**
     * @description Método responsável por validar os eventos de interesse do parâmetro HDP
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    validarEvento(evtEstOper) {
        
        return (evtEstOper.idEstadoOperativo == EstadoOperativo.DPR 
                    || evtEstOper.idEstadoOperativo == EstadoOperativo.DUR
                    || evtEstOper.idEstadoOperativo == EstadoOperativo.DPA
                    || evtEstOper.idEstadoOperativo == EstadoOperativo.DCA) && 
                util.validarIndisponibilidadeResponsabilidade(evtEstOper.idClassificacaoOrigem);
    }
}
