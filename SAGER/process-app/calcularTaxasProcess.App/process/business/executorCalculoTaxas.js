const utils = require("../../utils");
const ExecucaoCalculoFechamento = require("../entities/execucaoCalculoFechamento");
const Taxa = require("../entities/taxa");
const ParametroTaxa = require("../entities/parametroTaxa");
const constants = require("./constants");
const eventCatalog = require("../../../metadados/eventCatalog");
const CalculoTaxasPeriodoUge = require("./calculoTaxasPeriodoUge");
const CalculoTaxasPeriodoUsina = require("./calculoTaxasPeriodoUsina");
const PeriodoCalculo = require("./periodoCalculo");

module.exports.executarCalculoTaxas = function (contexto) {

    // TODO e a função agregada, por exemplo, se existem as taxas já
    var evento = contexto.evento;
    var dataSet = contexto.dataSet;

    var idFechamento = evento.payload.idFechamento;
    var fechamento = dataSet.FechamentoMensal.collection.firstOrDefault();

    if (!fechamento) {
        throw new Error("Não informado o fechamento mensal para execução das taxas.");
    }

    var execucaoCalculo = new ExecucaoCalculoFechamento();
    execucaoCalculo.id = utils.guid();
    execucaoCalculo.idFechamento = idFechamento;
    execucaoCalculo.dataInicio = Date.now;

    dataSet.ExecucaoCalculoFechamento.insert(execucaoCalculo);

    var usinas = dataSet.Usina.collection;
    contexto.eventoSaida = [];
    usinas.forEach(it => {

        contexto.eventoSaida.push({
            name: eventCatalog.calcular_taxas_mensais,
            payload: { idUsina: it.idUsina, fechamento: fechamento }
        });
    });

}

module.exports.calcularTaxasMensaisPorUsina = function (contexto) {

    var evento = contexto.evento;
    var dataSet = contexto.dataSet;

    var mes = evento.payload.fechamento.mes;
    var ano = evento.payload.fechamento.ano;
    var idFechamento = evento.payload.fechamento.id;

    var idUsina = evento.payload.idUsina;

    var uges = dataSet.UnidadeGeradora.collection;
    var eventosEstOper = dataSet.EventoMudancaEstadoOperativo.collection;

    var periodoCalculo = new PeriodoCalculo(mes, ano);

    var mesCompare = mes - 1;
    eventosEstOper = eventosEstOper.where(it => {
        return it.dataVerificadaEmSegundos >= periodoCalculo.dataInicioEmSegundos && 
            it.dataVerificadaEmSegundos <= periodoCalculo.dataFimEmSegundos;
    });

    var calculosUges = [];
    uges.forEach(uge => {
        var calculoUge = new CalculoTaxasPeriodoUge(
            periodoCalculo, uge,
            eventosEstOper.where(it => { return it.idUge == uge.idUge })
        );
        calculosUges.push(calculoUge);
    });

    var calculoUsina = new CalculoTaxasPeriodoUsina(periodoCalculo, idUsina, calculosUges);
    calculoUsina.calcular();

    calculoUsina.calculosTaxasPeriodoUge.forEach(calculoUge => {

        calculoUge.contadorEventos.listaCalculoTipoParametrosEventos.forEach(calculoParam => {
            dataSet.ParametroTaxa.insert(new ParametroTaxa(
                calculoParam.qtdHoras,
                calculoParam.tipoParametro,
                calculoUge.unidadeGeradora.idUge,
                idFechamento
            ));
        });

        dataSet.ParametroTaxa.insert(new ParametroTaxa(
            calculoUge.calculoParametroHP.qtdHoras,
            calculoUge.calculoParametroHP.tipoParametro,
            calculoUge.unidadeGeradora.idUge,
            idFechamento
        ));

    });

    dataSet.Taxa.insert(new Taxa(
        undefined,
        calculoUsina.valorTeip,
        constants.TipoTaxa.TEIP,
        idFechamento,
        idUsina
    ));

    dataSet.Taxa.insert(new Taxa(
        undefined,
        calculoUsina.valorTeifa,
        constants.TipoTaxa.TEIFA,
        idFechamento,
        idUsina
    ));

    contexto.eventoSaida = {
        name: eventCatalog.calcular_taxas_acumuladas,
        payload: evento.payload
    };
}

module.exports.calcularTaxasAcumuladasPorUsina = function (contexto) {

}