const EventoMudancaEstadoOperativo = require("../entities/eventomudancaestadooperativo");
const ContadorParametrosTaxasEvento = require("./parametros/contadorparametrostaxasevento");
const CalculoParametroHP = require("./parametros/calculoparametrohp");

module.exports = class CalculoTaxasPeriodoUge {

    constructor(periodoCalculo, unidadeGeradora, eventosEstadoOperativo) {

        this.periodoCalculo = periodoCalculo;
        this.unidadeGeradora = unidadeGeradora;
        this.eventosEstadoOperativo = CalculoTaxasPeriodoUge.orderEventosEstadoOperativo(eventosEstadoOperativo);

        this.contadorEventos = new ContadorParametrosTaxasEvento(unidadeGeradora, periodoCalculo);
        this.calculoParametroHP = CalculoParametroHP.factory(unidadeGeradora, periodoCalculo);
    }

    static orderEventosEstadoOperativo(eventos) {
        return eventos.orderBy(it => { return it.dataVerificadaEmSegundos; })
    }

    reset() {
        this.contadorEventos.reset();
    }

    calcular() {

        this.eventosEstadoOperativo.forEach(evtEstOpr => {
            this.contadorEventos.computarQtdHorasEvento(evtEstOpr);
        });

        var eventoFinalizacao = new EventoMudancaEstadoOperativo();
        eventoFinalizacao.dataVerificada = this.periodoCalculo.dataFim;

        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(eventoFinalizacao);
        this.contadorEventos.computarQtdHorasEvento(eventoFinalizacao);

        this.calculoParametroHP.calcular(this.periodoCalculo);
    }

}
