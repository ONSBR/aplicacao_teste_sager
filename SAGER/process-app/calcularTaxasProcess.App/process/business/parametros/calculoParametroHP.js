var TipoParametro = require("../constants").TipoParametro;
var AbstractCalculoParametro = require("./_abstractCalculoParametro").AbstractCalculoParametro;
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
     * @param {int} mes Indica o mes para o qual está sendo feito o cálculo.
     * @param {int} ano Indica o ano para o qual está sendo feito o cálculo.
     */
    calcular(mes, ano) {
        
        this.validar(mes, ano);

        var dataInicioOperacaoEmSegundos = this.unidadeGeradora.dataInicioOperacao.getTotalSeconds();
        
        var dataInicioCalculoEmSegundos = new Date(ano, --mes, 1, 0, 0, 0).getTotalSeconds();
        var dataFimCalculoEmSegundos = new Date(ano, ++mes, 1, 0, 0, 0).getTotalSeconds();
        
        if (dataInicioOperacaoEmSegundos > dataInicioCalculoEmSegundos) {
            dataInicioCalculoEmSegundos = dataInicioOperacaoEmSegundos;
        }

        this.qtdHorasEmSegundos = dataFimCalculoEmSegundos - dataInicioCalculoEmSegundos;
    }

    /**
     * @description Valida as informações e parâmetros para o cálculo de HP.
     * @param {int} mes Indica o mes para o qual está sendo feito o cálculo.
     * @param {int} ano Indica o ano para o qual está sendo feito o cálculo.
     */
    validar(mes, ano) {

        super.validarUnidadeGeradora();

        if (!this.unidadeGeradora || !this.unidadeGeradora.dataInicioOperacao) {
            throw new Error("A data de início de operação deve ser informada para calcular o parâmetro de HP");
        }

        if (!mes || !ano || mes <= 0 || ano <= 0) {
            throw new Error("O mês e ano de referência devem ser informados para o cálculo do parâmetro HP");
        }

    }
}
