var CalculoParametroHDF = require("./calculoparametrohdf");
var CalculoParametroHEDF = require("./calculoparametrohedf");
var CalculoParametroHS = require("./calculoparametrohs");
var CalculoParametroHRD = require("./calculoparametrohrd");
var CalculoParametroHDCE = require("./calculoparametrohdce");
var CalculoParametroHDP = require("./calculoparametrohdp");
var CalculoParametroHEDP = require("./calculoparametrohedp");
var util = require("./utilcalculoparametro");

/**
 * @description Classe responsável por agrupar os cálculos de parâmetros que computam aventos
 * para facilitar a avaliação dos eventos, validar e computar para cada parâmetro.
 */
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

    /**
     * @description Limpa todos os valores de horas computados para os parâmetros
     */
    reset() {
        this.listaCalculoTipoParametrosEventos.forEach(calculoParam => {
            calculoParam.reset();
        });
    }

    /**
     * Validar o contador, informações comuns a todos os cálculos de parâmetros.
     */
    validar() {
        if (!this.unidadeGeradora) {
            throw new Error("unidade geradora deve ser informada para o contador.");
        }
    }

    /**
     * @description Computa a quantidade de horas de operação do evento para o parâmetro, caso satisfaça as condições do parâmetro. 
     * Cada parâmetro computa as horas do evento de forma diferente, conforme as regras estabelecidas, 
     * e conforme os dados do evento: estado operativo, condição operativa, origem do evento.
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    computarQtdHorasEvento(evtEstOper) {

        this.listaCalculoTipoParametrosEventos.forEach(calculoParam => {

            // Todas as regras de parâmetros de taxas valem para eventos a partir de 01/2000
            if (!util.lt_01_2000(evtEstOper)) {

                calculoParam.computarEvento(evtEstOper);
            }
        });
    }
}
