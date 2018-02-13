var CalculoParametroHDF = require("./calculoparametrohdf");
var CalculoParametroHEDF = require("./calculoparametrohedf");
var CalculoParametroHS = require("./calculoparametrohs");
var CalculoParametroHRD = require("./calculoparametrohrd");
var CalculoParametroHDCE = require("./calculoparametrohdce");
var CalculoParametroHDP = require("./calculoparametrohdp");
var CalculoParametroHEDP = require("./calculoparametrohedp");
var util = require("./utilcalculoparametro");

module.exports = class ContadorParametrosTaxasEvento {

    constructor(unidadeGeradora, periodoCalculo) {

        this.unidadeGeradora = unidadeGeradora;
        this.validar();

        this.listaCalculoTipoParametrosEventos = [];

        this.calculoParametroHDF = CalculoParametroHDF.factory(unidadeGeradora, periodoCalculo);
        this.calculoParametroHEDF = CalculoParametroHEDF.factory(unidadeGeradora, periodoCalculo);
        this.calculoParametroHS = CalculoParametroHS.factory(unidadeGeradora, periodoCalculo);
        this.calculoParametroHRD = CalculoParametroHRD.factory(unidadeGeradora, periodoCalculo);
        this.calculoParametroHDCE = CalculoParametroHDCE.factory(unidadeGeradora, periodoCalculo);
        this.calculoParametroHDP = CalculoParametroHDP.factory(unidadeGeradora, periodoCalculo);
        this.calculoParametroHEDP = CalculoParametroHEDP.factory(unidadeGeradora, periodoCalculo);

        this.listaCalculoTipoParametrosEventos.push(this.calculoParametroHDF);
        this.listaCalculoTipoParametrosEventos.push(this.calculoParametroHEDF);
        this.listaCalculoTipoParametrosEventos.push(this.calculoParametroHS);
        this.listaCalculoTipoParametrosEventos.push(this.calculoParametroHRD);
        this.listaCalculoTipoParametrosEventos.push(this.calculoParametroHDCE);
        this.listaCalculoTipoParametrosEventos.push(this.calculoParametroHDP);
        this.listaCalculoTipoParametrosEventos.push(this.calculoParametroHEDP);

    }

    reset() {
        this.listaCalculoTipoParametrosEventos.forEach(calculoParam => {
            calculoParam.reset();
        });
    }

    validar() {
        if (!this.unidadeGeradora) {
            throw new Error("unidade geradora deve ser informada para o contador.");
        }
    }

    computarQtdHorasEvento(evtEstOper) {

        this.listaCalculoTipoParametrosEventos.forEach(calculoParam => {

            // Todas as regras de parâmetros de taxas valem para eventos a partir de 01/2000
            if (!util.lt_01_2000(evtEstOper)) {

                calculoParam.computarEvento(evtEstOper);
            }
        });
    }
}
