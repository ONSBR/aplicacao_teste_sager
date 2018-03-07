var TipoParametro = require("../constants").TipoParametro;
var AbstractCalculoParametro = require("./_abstractcalculoparametro").AbstractCalculoParametro;
var extensions = require("../../../extensions");

/**
 * @description RNC103 - Parâmetro do total de horas do período de apuração HP
 * Classe responsável por realizar os cálculos do tipo de parâmetro HP
 */
class CalculoParametroHP extends AbstractCalculoParametro {

    constructor(unidadeGeradora) {
        super(TipoParametro.HP, unidadeGeradora);
    }

    /**
     * @description Método responsável por calcular o parâmetro HP para o mês informado
     * @param {PeriodoCalculo} Periodo para o qual está sendo feito o cálculo.
     */
    calcular(periodoCalculo) {

        super.validarUnidadeGeradora();

        if (typeof this.unidadeGeradora.dataInicioOperacao === "string"){
            this.unidadeGeradora.dataInicioOperacao = new Date(this.unidadeGeradora.dataInicioOperacao.replace("00:00:00 GMT",""));
        }
        var dataInicioOperacaoEmSegundos = this.unidadeGeradora.dataInicioOperacao.dataVerificada &&
         typeof this.unidadeGeradora.dataInicioOperacao.getTotalSeconds === "function" ? this.unidadeGeradora.dataInicioOperacao.getTotalSeconds() : 0;

        var dataInicioCalculoEmSegundos = periodoCalculo.dataInicioEmSegundos;
        var dataFimCalculoEmSegundos = periodoCalculo.dataFimEmSegundos;

        if (dataInicioOperacaoEmSegundos > dataInicioCalculoEmSegundos) {
            dataInicioCalculoEmSegundos = dataInicioOperacaoEmSegundos;
        }

        this.qtdHorasEmSegundos = dataFimCalculoEmSegundos - dataInicioCalculoEmSegundos;
    }

    static gerarDataVerificadaEmSegundos(evento) {
        //TODO: refatorar
        if (typeof evento.dataVerificada === "string"){
            evento.dataVerificada = new Date(evento.dataVerificada.replace("00:00:00 GMT",""));
        }
        evento.dataVerificadaEmSegundos = evento.dataVerificada &&
         typeof evento.dataVerificada.getTotalSeconds === "function" ? evento.dataVerificada.getTotalSeconds() : 0;
    }
}

/**
 * @description RNC103 - Parâmetro do total de horas do período de apuração HP
 * @param {UnidadeGeradora} unidadeGeradora
 * @param {PeriodoCalculo} periodoCalculo
 */
module.exports.factory = function (unidadeGeradora, periodoCalculo) {
    return new CalculoParametroHP(unidadeGeradora);
}