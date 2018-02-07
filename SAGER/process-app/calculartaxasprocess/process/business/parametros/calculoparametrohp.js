var TipoParametro = require("../constants").TipoParametro;
var AbstractCalculoParametro = require("./_abstractcalculoparametro").AbstractCalculoParametro;
var extensions = require("../../../extensions");

/**
 * @description RNC103 - Parâmetro do total de horas do período de apuração HP
 * Classe responsável por realizar os cálculos do tipo de parâmetro HP
 */
module.exports = class CalculoParametroHP extends AbstractCalculoParametro {
    
    constructor(unidadeGeradora) {
        super(TipoParametro.HP, unidadeGeradora);
    }

    /**
     * @description Método responsável por calcular o parâmetro HP para o mês informado
     * @param {PeriodoCalculo} Periodo para o qual está sendo feito o cálculo.
     */
    calcular(periodoCalculo) {

        super.validarUnidadeGeradora();
        
        var dataInicioOperacaoEmSegundos = this.unidadeGeradora.dataInicioOperacao.getTotalSeconds();
        
        var dataInicioCalculoEmSegundos = periodoCalculo.dataInicioEmSegundos;
        var dataFimCalculoEmSegundos = periodoCalculo.dataFimEmSegundos;
        
        if (dataInicioOperacaoEmSegundos > dataInicioCalculoEmSegundos) {
            dataInicioCalculoEmSegundos = dataInicioOperacaoEmSegundos;
        }

        this.qtdHorasEmSegundos = dataFimCalculoEmSegundos - dataInicioCalculoEmSegundos;
    }

   
}
