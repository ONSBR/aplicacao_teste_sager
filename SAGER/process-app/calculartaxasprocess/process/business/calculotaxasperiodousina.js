const Enumerable = require('linq');
const utils = require('../../utils');
const extensions = require('../../extensions');

/**
 * @description Classe responsável pela execução do cálculo de taxas para uma Usina.
 * Utiliza no cálculo os parâmetros computados para cada unidade geradora.
 * @class CalculoTaxasPeriodoUsina
 */
module.exports = class CalculoTaxasPeriodoUsina {

    /**
     * @ Controi o cálculo de taxas por usina.
     * @param {PeriodoCalculo} periodoCalculo 
     * @param {int} idUsina 
     * @param {CalculoTaxasPeriodoUge[]} calculosTaxasPeriodoUge 
     */
    constructor(periodoCalculo, idUsina, calculosTaxasPeriodoUge) {

        this.periodoCalculo = periodoCalculo;
        this.idUsina = idUsina;
        this.calculosTaxasPeriodoUge = calculosTaxasPeriodoUge;

        this.valorTeip = 0;
        this.valorTeifa = 0;
    }

    /**
     * @description Método para limpar os dados de computação de parâmetros das uges.
     * @method reset
     */
    reset() {
        this.calculosTaxasMensaisUge.forEach(calculoUge => {
            calculoUge.reset();
        });
    }

    /**
     * @description Executa o cálculo das taxas para a usina.
     * @method calcular
     */
    calcular() {

        // TODO pode paralelizar o calculo das uges (sem prioridade, verificar a necessidade)
        this.calculosTaxasPeriodoUge.forEach(calculoUge => {
            calculoUge.calcular();
        });

        var totalTeipUge = 0;
        var totalTeifaUge = 0;
        var totalPotUge = 0;
        this.calculosTaxasPeriodoUge.forEach(calculoUge => {
            var potdisp = calculoUge.unidadeGeradora.potenciaDisponivel;
            totalTeipUge += (potdisp*calculoUge.valorTeip);
            totalTeifaUge += (potdisp*calculoUge.valorTeifa);
            totalPotUge += potdisp;
        });

        this.valorTeip = totalTeipUge / totalPotUge;
        this.valorTeifa = totalTeifaUge / totalPotUge;
    }

    toString() {

        return "[CalculoTaxasPeriodoUsina]: " +
            JSON.stringify({
                idUsina: this.idUsina, mes: this.periodoCalculo.mes, 
                ano: this.periodoCalculo.ano, valorTeip: this.valorTeip,
                HDF: this.HDF, HEDF: this.HEDF, HS: this.HS, 
                HRD: this.HRD, HDCE: this.HDCE, HDP: this.HDP, 
                HEDP: this.HEDP, HP: this.HP,
                valorTeifa: this.valorTeifa,
                calculosTaxasMensaisUge: Enumerable.from(this.calculosTaxasMensaisUge).
                    select(it => {
                        return {
                            idUge: it.unidadeGeradora.id,
                            HDF: it.contadorEventos.calculoParametroHDF.qtdHoras,
                            HEDF: it.contadorEventos.calculoParametroHEDF.qtdHoras,
                            HS: it.contadorEventos.calculoParametroHS.qtdHoras,
                            HRD: it.contadorEventos.calculoParametroHRD.qtdHoras,
                            HDCE: it.contadorEventos.calculoParametroHDCE.qtdHoras,
                            HDP: it.contadorEventos.calculoParametroHDP.qtdHoras,
                            HEDP: it.contadorEventos.calculoParametroHEDP.qtdHoras,
                            HP: it.calculoParametroHP.qtdHoras
                        };
                    }).toArray()
            });
    }
}

