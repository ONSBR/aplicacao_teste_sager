var moment = require("moment");
var extensions = require("../../extensions");

module.exports = class PeriodoCalculo {

    constructor(mes, ano, qtdMesesAntecicacao) {

        this.mes = mes;
        this.ano = ano;

        this.validar(mes, ano);

        if (!qtdMesesAntecicacao) {
            qtdMesesAntecicacao = 1;
        }

        var momentFim = moment(new Date(ano, mes - 1, 1, 0, 0, 0, 0)).add(1, "months");
        this.dataFim = momentFim.toDate();
        this.dataFimEmSegundos = this.dataFim.getTotalSeconds();

        this.dataInicio = momentFim.subtract(qtdMesesAntecicacao, "months").toDate();
        this.dataInicioEmSegundos = this.dataInicio.getTotalSeconds();
    }


    /**
    * @description Valida as informações e parâmetros para o cálculo.
    * @param {int} mes Indica o mes para o qual está sendo feito o cálculo.
    * @param {int} ano Indica o ano para o qual está sendo feito o cálculo.
    */
    validar(mes, ano) {

        if (!mes || !ano || mes <= 0 || ano <= 0) {
            throw new Error("O mês e ano de referência devem ser informados para o cálculo de taxas.");
        }

    }

}