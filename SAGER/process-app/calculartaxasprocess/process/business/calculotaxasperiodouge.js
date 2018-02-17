const EventoMudancaEstadoOperativo = require("../entities/eventomudancaestadooperativo");
const ContadorParametrosTaxasEvento = require("./parametros/contadorparametrostaxasevento");
const CalculoParametroHP = require("./parametros/calculoparametrohp");

/**
 * @class CalculoTaxasPeriodoUge
 * @description Classe responsável por realizar o cálculo de taxas para 
 * um determinado período para cada unidade geradora.
 */
module.exports = class CalculoTaxasPeriodoUge {

    /**
     * @description Constrói o cálculo de taxa de periodo para unidade geradora.
     * @param {PeriodoCalculo} periodoCalculo 
     * @param {UnidadeGeradora} unidadeGeradora 
     * @param {EventoMudancaEstadoOperativo} eventosEstadoOperativo 
     */
    constructor(periodoCalculo, unidadeGeradora, eventosEstadoOperativo) {

        this.periodoCalculo = periodoCalculo;
        this.unidadeGeradora = unidadeGeradora;
        this.eventosEstadoOperativo = CalculoTaxasPeriodoUge.orderEventosEstadoOperativo(eventosEstadoOperativo);

        this.contadorEventos = new ContadorParametrosTaxasEvento(unidadeGeradora, periodoCalculo);
        this.calculoParametroHP = CalculoParametroHP.factory(unidadeGeradora, periodoCalculo);

        this.valorTeip = 0;
        this.valorTeifa = 0;
    }

    /**
     * @description Método responsável por ordenar a lista de eventos para executar a computação em cada parãmetro.
     * @param {EventoMudancaEstadoOperativo[]} eventos 
     * @method orderEventosEstadoOperativo
     */
    static orderEventosEstadoOperativo(eventos) {
        return eventos.orderBy(it => { return it.dataVerificadaEmSegundos; })
    }

    reset() {
        this.contadorEventos.reset();
        this.calculoParametroHP.reset();
        this.valorTeip = 0;
        this.valorTeifa = 0;
    }

    /**
     * @method calcular
     * @description Executa a computação de horas dos parâmetros para uma unidade geradora.
     */
    calcular() {

        this.eventosEstadoOperativo.forEach(evtEstOpr => {
            this.contadorEventos.computarQtdHorasEvento(evtEstOpr);
        });

        var eventoFinalizacao = new EventoMudancaEstadoOperativo();
        eventoFinalizacao.dataVerificada = this.periodoCalculo.dataFim;

        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(eventoFinalizacao);
        this.contadorEventos.computarQtdHorasEvento(eventoFinalizacao);

        this.calculoParametroHP.calcular(this.periodoCalculo);

        this.calcularTeip();
        this.calcularTeifa();
    }


    /**
     * @description Executa o cálculo da taxa TEIP para a usina, usando os parâmetros calculados.
     * @method calcularTeip
     */
    calcularTeip() {

        var hdpEmSeg = this.contadorEventos.calculoParametroHDP.qtdHorasEmSegundos;
        var hedpEmSeg = this.contadorEventos.calculoParametroHEDP.qtdHorasEmSegundos;
        var hpEmSeg = this.calculoParametroHP.qtdHorasEmSegundos;

        this.valorTeip = (hdpEmSeg + hedpEmSeg) / hpEmSeg;
    }

    /**
     * @description Executa o cálculo da taxa TEIFA para a usina, usando os parâmetros calculados.
     * @method calcularTeifa
     */
    calcularTeifa() {

        var hdfEmSeg = this.contadorEventos.calculoParametroHDF.qtdHorasEmSegundos;
        var hedfEmSeg = this.contadorEventos.calculoParametroHEDF.qtdHorasEmSegundos;
        var hsEmSeg = this.contadorEventos.calculoParametroHS.qtdHorasEmSegundos;
        var hrdEmSeg = this.contadorEventos.calculoParametroHRD.qtdHorasEmSegundos;
        var hdceEmSeg = this.contadorEventos.calculoParametroHDCE.qtdHorasEmSegundos;

        this.valorTeifa = (hdfEmSeg + hedfEmSeg) / (hdfEmSeg + hsEmSeg + hrdEmSeg + hdceEmSeg);
    }

}
