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
     
        var condicao1 = evtEstOper.idEstadoOperativo == EstadoOperativo.DCO || evtEstOper.idEstadoOperativo == EstadoOperativo.RDP;
        
        /*var condicao2Estado = [EstadoOperativo.DPR, EstadoOperativo.DPA, EstadoOperativo.DUR, EstadoOperativo.DEM, 
            EstadoOperativo.DAU, EstadoOperativo.DAP].indexOf(evtEstOper.idEstadoOperativo) >= 0;

        var condicao2Origem = [ClassificacaoOrigem.GCI, ClassificacaoOrigem.GIS, 
            ClassificacaoOrigem.GIM, ClassificacaoOrigem.GVO, ClassificacaoOrigem.GMP, 
            ClassificacaoOrigem.GMT].indexOf(evtEstOper.idClassificacaoOrigem)>=0;*/

        var condicao2Estado = [EstadoOperativo.DPR].indexOf(evtEstOper.idEstadoOperativo) >= 0
        var condicao2Origem = true;

        if (util.between_01_2000_e_09_2014(evtEstOper)) {
     
            return condicao1 || (condicao2Estado && condicao2Origem);

        } else if (util.gte_10_2014(evtEstOper)) {

            // TODO considerando proporcionalmente as limitações de potência nominal, no mês de apuração. 
            // TODO : ATENÇÂO: É necessário criar todo o histórico das taxas dos últimos 60 meses com base 
            //        neste novo critério para poder realizar o cálculo.

            return condicao1 || (condicao2Estado && condicao2Origem);
        }

    }
}
