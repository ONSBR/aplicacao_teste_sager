var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var AbstractCalculoParametroEventoDiferenca = require("./_abstractCalculoParametro").AbstractCalculoParametroEventoDiferenca;
var util = require("./utilCalculoParametro");

/**
 * @description RNC107 - Parâmetro Horas de Reserva Desligada – HRD
 * Classe responsável por realizar os cálculos do tipo de parâmetro HRD
 */
module.exports = class CalculoParametroHRD extends AbstractCalculoParametroEventoDiferenca {
    
    constructor(unidadeGeradora) {
        super(TipoParametro.HRD, unidadeGeradora);
        
        this.qtdHorasParcela2 = 0;
    }

    /**
     * @description Método responsável por validar os eventos de interesse do parâmetro HRD
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    validarEvento(evtEstOper) {
     
        if (util.between_01_2000_e_09_2014(evtEstOper)) {
            
            return (evtEstOper.idEstadoOperativo == EstadoOperativo.DCO 
                || evtEstOper.idEstadoOperativo == EstadoOperativo.RDP);

        } else if (util.gte_10_2014(evtEstOper)) {

            // TODO considerando proporcionalmente as limitações de potência nominal, no mês de apuração. 
            // TODO : ATENÇÂO: É necessário criar todo o histórico das taxas dos últimos 60 meses com base 
            //        neste novo critério para poder realizar o cálculo.

            return util.validarEstado_LIG_LCC_LCI_LCS(evtEstOper.idEstadoOperativo)
        }

    }
}
