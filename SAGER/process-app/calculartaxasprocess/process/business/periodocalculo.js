var moment = require("moment");
var extensions = require("../../extensions");

/**
 * @class PeriodoCalculo
 * @description Classe utilitária para identificar os períodos de cálculo de acordo 
 * com os parâmetros de cálculo
 */
module.exports = class PeriodoCalculo {

    /**
     * Constrói o período de cálculo.
     * @param {int} mes 
     * @param {int} ano 
     * @param {int} qtdMesesAntecicacao 
     */
    constructor(mes, ano, qtdMesesAntecicacao) {

        this.mes = mes;
        this.ano = ano;
        this.mesAnoInterval = [];

        this.validar(mes, ano);

        if (!qtdMesesAntecicacao) {
            qtdMesesAntecicacao = 1;
        }

        var momentFim = moment(new Date(ano, mes - 1, 1, 0, 0, 0, 0));
        var momentInicio = momentFim;
        momentFim = momentFim.add(1, "months");
        this.dataFim = momentFim.toDate();
        this.dataFimEmSegundos = this.dataFim.getTotalSeconds();
        
        for(var i=0; i < qtdMesesAntecicacao; i++) {
            momentInicio = momentInicio.subtract(1, "months");
            this.mesAnoInterval.push({"mes": (momentInicio.month()+1), "ano": momentInicio.year()});
        }
        this.dataInicio = momentInicio.toDate();
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