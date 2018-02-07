const EventoMudancaEstadoOperativo = require("../entities/eventoMudancaEstadoOperativo");
const ContadorParametrosTaxasEvento = require("./parametros/contadorParametrosTaxasEvento");
const CalculoParametroHP = require("./parametros/calculoParametroHP");

module.exports = class CalculoTaxasPeriodoUge {

    constructor(periodoCalculo, unidadeGeradora, eventosEstadoOperativo) {

        this.periodoCalculo = periodoCalculo;
        this.unidadeGeradora = unidadeGeradora;
        this.eventosEstadoOperativo = CalculoTaxasPeriodoUge.orderEventosEstadoOperativo(eventosEstadoOperativo);

        this.contadorEventos = new ContadorParametrosTaxasEvento(unidadeGeradora);
        this.calculoParametroHP = new CalculoParametroHP(unidadeGeradora);
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
