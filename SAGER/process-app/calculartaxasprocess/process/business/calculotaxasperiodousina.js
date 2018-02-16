const Enumerable = require('linq');
const utils = require('../../utils');
const extensions = require('../../extensions');

module.exports = class CalculoTaxasPeriodoUsina {

    constructor(periodoCalculo, idUsina, calculosTaxasPeriodoUge) {

        this.periodoCalculo = periodoCalculo;
        this.idUsina = idUsina;
        this.calculosTaxasPeriodoUge = calculosTaxasPeriodoUge;

        this.valorTeip = 0;
        this.valorTeifa = 0;

        this.resetParametrosTaxas();
    }

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

    get HDF() {
        return utils.secondToHour(this.paramHDFEmSegundos);
    }

    get HEDF() {
        return utils.secondToHour(this.paramHEDFEmSegundos);
    }

    get HS() {
        return utils.secondToHour(this.paramHSEmSegundos);
    }

    get HRD() {
        return utils.secondToHour(this.paramHRDEmSegundos);
    }

    get HDCE() {
        return utils.secondToHour(this.paramHDCEEmSegundos);
    }

    get HDP() {
        return utils.secondToHour(this.paramHDPEmSegundos);
    }

    get HEDP() {
        return utils.secondToHour(this.paramHEDPEmSegundos);
    }

    get HP() {
        return utils.secondToHour(this.paramHPEmSegundos);
    }

    reset() {
        this.calculosTaxasMensaisUge.forEach(calculoUge => {
            calculoUge.reset();
        });

    }

    calcular() {

        // TODO pode paralelizar o calculo das uges
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

    calcularTeip() {

        this.valorTeip = (this.paramHDPEmSegundos + this.paramHEDPEmSegundos) / this.paramHPEmSegundos;
    }

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

