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

        this.resetParametrosTaxas();
    }

    /**
     * @description Limpa os resultados de computação de parâmetros.
     * @method resetParametrosTaxas
     */
    resetParametrosTaxas() {
        this.paramHDFEmSegundos = 0;
        this.paramHEDFEmSegundos = 0;
        this.paramHSEmSegundos = 0;
        this.paramHRDEmSegundos = 0;
        this.paramHDCEEmSegundos = 0;
        this.paramHDPEmSegundos = 0;
        this.paramHEDPEmSegundos = 0;
        this.paramHPEmSegundos = 0;
    }

    /**
     * @description Obtém o resultado do parâmetro HDF em horas.
     * @property HDF
     */
    get HDF() {
        return utils.secondToHour(this.paramHDFEmSegundos);
    }

    /**
     * @description Obtém o resultado do parâmetro HEDF em horas.
     * @property HEDF
     */
    get HEDF() {
        return utils.secondToHour(this.paramHEDFEmSegundos);
    }

    /**
     * @description Obtém o resultado do parâmetro HS em horas.
     * @property HS
     */
    get HS() {
        return utils.secondToHour(this.paramHSEmSegundos);
    }

    /**
     * @description Obtém o resultado do parâmetro HRD em horas.
     * @property HRD
     */
    get HRD() {
        return utils.secondToHour(this.paramHRDEmSegundos);
    }

    /**
     * @description Obtém o resultado do parâmetro HDCE em horas.
     * @property HDCE
     */
    get HDCE() {
        return utils.secondToHour(this.paramHDCEEmSegundos);
    }

    /**
     * @description Obtém o resultado do parâmetro HDP em horas.
     * @property HDP
     */
    get HDP() {
        return utils.secondToHour(this.paramHDPEmSegundos);
    }

    /**
     * @description Obtém o resultado do parâmetro HEDP em horas.
     * @property HEDP
     */
    get HEDP() {
        return utils.secondToHour(this.paramHEDPEmSegundos);
    }

    /**
     * @description Obtém o resultado do parâmetro HP em horas.
     * @property HP
     */
    get HP() {
        return utils.secondToHour(this.paramHPEmSegundos);
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

            this.paramHDFEmSegundos += calculoUge.contadorEventos.calculoParametroHDF.qtdHorasEmSegundos;
            this.paramHEDFEmSegundos += calculoUge.contadorEventos.calculoParametroHEDF.qtdHorasEmSegundos;
            this.paramHSEmSegundos += calculoUge.contadorEventos.calculoParametroHS.qtdHorasEmSegundos;
            this.paramHRDEmSegundos += calculoUge.contadorEventos.calculoParametroHRD.qtdHorasEmSegundos;
            this.paramHDCEEmSegundos += calculoUge.contadorEventos.calculoParametroHDCE.qtdHorasEmSegundos;
            this.paramHDPEmSegundos += calculoUge.contadorEventos.calculoParametroHDP.qtdHorasEmSegundos;
            this.paramHEDPEmSegundos += calculoUge.contadorEventos.calculoParametroHEDP.qtdHorasEmSegundos;
            this.paramHPEmSegundos += calculoUge.calculoParametroHP.qtdHorasEmSegundos;
        });

        this.calcularTeip();
        this.calcularTeifa();
    }

    /**
     * @description Executa o cálculo da taxa TEIP para a usina, usando os parâmetros calculados.
     * @method calcularTeip
     */
    calcularTeip() {

        this.valorTeip = (this.paramHDPEmSegundos + this.paramHEDPEmSegundos) / this.paramHPEmSegundos;
    }

    /**
     * @description Executa o cálculo da taxa TEIFA para a usina, usando os parâmetros calculados.
     * @method calcularTeifa
     */
    calcularTeifa() {

        this.valorTeifa = (this.paramHDFEmSegundos + this.paramHEDFEmSegundos) /
            (this.paramHSEmSegundos + this.paramHDFEmSegundos + this.paramHRDEmSegundos + this.paramHDCEEmSegundos + this.paramHDPEmSegundos);
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

