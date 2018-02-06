const EventoMudancaEstadoOperativo = require("../entities/eventoMudancaEstadoOperativo");
const ContadorParametrosTaxasEvento = require("./parametros/contadorParametrosTaxasEvento");
const CalculoParametroHP = require("./parametros/calculoParametroHP");

module.exports = class CalculoTaxasMensaisUge {

    constructor(mes, ano, unidadeGeradora, eventosEstadoOperativo) {

        this.mes = mes;
        this.ano = ano;
        this.unidadeGeradora = unidadeGeradora;
        this.eventosEstadoOperativo = CalculoTaxasMensaisUge.orderEventosEstadoOperativo(eventosEstadoOperativo);

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
        eventoFinalizacao.dataVerificada = new Date(this.ano, this.mes, 1, 0, 0, 0);
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(eventoFinalizacao);
        this.contadorEventos.computarQtdHorasEvento(eventoFinalizacao);

        this.calculoParametroHP.calcular(this.mes, this.ano);
    }

}
