var CalculoParametroHDF = require("./calculoParametroHDF");
var CalculoParametroHDF = require("./calculoParametroHDF");
var CalculoParametroHEDF = require("./calculoParametroHEDF");
var CalculoParametroHS = require("./calculoParametroHS");
var CalculoParametroHRD = require("./calculoParametroHRD");
var CalculoParametroHDCE = require("./calculoParametroHDCE");
var CalculoParametroHDP = require("./calculoParametroHDP");
var CalculoParametroHEDP = require("./calculoParametroHEDP");
var util = require("./utilCalculoParametro");

module.exports = class ContadorParametrosTaxasEvento {

    constructor(unidadeGeradora) {

        this.unidadeGeradora = unidadeGeradora;
        this.validar();

        this.listaCalculoTipoParametrosEventos = [];

        this.calculoParametroHDF = new CalculoParametroHDF(unidadeGeradora);
        this.calculoParametroHEDF = new CalculoParametroHEDF(unidadeGeradora);
        this.calculoParametroHS = new CalculoParametroHS(unidadeGeradora);
        this.calculoParametroHRD = new CalculoParametroHRD(unidadeGeradora);
        this.calculoParametroHDCE = new CalculoParametroHDCE(unidadeGeradora);
        this.calculoParametroHDP = new CalculoParametroHDP(unidadeGeradora);
        this.calculoParametroHEDP = new CalculoParametroHEDP(unidadeGeradora);

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
