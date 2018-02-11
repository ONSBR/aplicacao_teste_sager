const utils = require("../../utils");
const ExecucaoCalculoFechamento = require("../entities/execucaocalculofechamento");
const Taxa = require("../entities/taxa");
const ParametroTaxa = require("../entities/parametrotaxa");
const FechamentoMensal = require("../entities/fechamentomensal");
const constants = require("./constants");
const eventCatalog = require("../../metadados/eventcatalog");
const CalculoTaxasPeriodoUge = require("./calculotaxasperiodouge");
const CalculoTaxasPeriodoUsina = require("./calculotaxasperiodousina");
const PeriodoCalculo = require("./periodocalculo");

module.exports.executarCalculoTaxas = function (contexto, eventManager) {

    console.log("INICIO [executarCalculoTaxas]: " + JSON.stringify(contexto));

    // TODO e a função agregada, por exemplo, se existem as taxas já
    var evento = contexto.event;
    var dataset = contexto.dataset;
    var payload = evento.payload;

    var fechamento = dataset.fechamentomensal.collection.firstOrDefault(it => {
        return it.ano == payload.anoFechamento && it.mes == payload.mesFechamento;
    });

    // TODO deveria obter do contexto
    var dataAtual = new Date();

    if (!fechamento) {
        //throw new Error("Não informado o fechamento mensal para execução das taxas.");
        fechamento = new FechamentoMensal(
            utils.guid(),
            payload.mesFechamento,
            payload.anoFechamento,
            dataAtual
        );
        dataset.fechamentomensal.insert(fechamento);
    }

    var execucaoCalculo = new ExecucaoCalculoFechamento();
    execucaoCalculo.id = utils.guid();
    execucaoCalculo.idFechamento = fechamento.id;
    execucaoCalculo.dataInicio = dataAtual;

    dataset.execucaocalculofechamento.insert(execucaoCalculo);
    execucaoCalculo._metadata.changeTrack = "create";

    var periodoCalculo = new PeriodoCalculo(payload.mesFechamento, payload.anoFechamento);

    var usinas = dataset.usina.collection;
    usinas.forEach(it => {

        eventManager.emit({
            name: "calculate.tax.request",
            payload: { idUsina: it.idUsina, 
                fechamento: fechamento, 
                dataInicialEvento: periodoCalculo.dataInicio,
                dataFinalEvento: periodoCalculo.dataFim
            }
        }).then(result => {
            console.log("Usina: " + it.idUsina);
        }).catch(error => {
            console.log("Error Usina: " + error.stack);
        });
    });

    resolve();
}

module.exports.calcularTaxasMensaisPorUsina = function (contexto, eventManager) {

    console.log("INICIO [calcularTaxasMensaisPorUsina]: " + JSON.stringify(contexto.dataset.eventomudancaestadooperativo.collection.toArray().length));

    var evento = contexto.event;
    var dataset = contexto.dataset;

    var mes = evento.payload.fechamento.mes;
    var ano = evento.payload.fechamento.ano;
    var idFechamento = evento.payload.fechamento.id;

    var idUsina = evento.payload.idUsina;

    var uges = dataset.unidadegeradora.collection;
    var eventosEstOper = dataset.eventomudancaestadooperativo.collection;

    var periodoCalculo = new PeriodoCalculo(mes, ano);

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
            dataset.parametrotaxa.insert(new ParametroTaxa(
                utils.guid(),
                calculoParam.qtdHoras,
                calculoParam.tipoParametro,
                calculoUge.unidadeGeradora.idUge,
                idFechamento
            ));
        });

        dataset.parametrotaxa.insert(new ParametroTaxa(
            utils.guid(),
            calculoUge.calculoParametroHP.qtdHoras,
            calculoUge.calculoParametroHP.tipoParametro,
            calculoUge.unidadeGeradora.idUge,
            idFechamento
        ));

    });

    dataset.taxa.insert(new Taxa(
        utils.guid(),
        calculoUsina.valorTeip,
        constants.TipoTaxa.TEIP,
        idFechamento,
        idUsina
    ));

    dataset.taxa.insert(new Taxa(
        utils.guid(),
        calculoUsina.valorTeifa,
        constants.TipoTaxa.TEIFA,
        idFechamento,
        idUsina
    ));

    console.log("FIM [calcularTaxasMensaisPorUsina]: " + JSON.stringify(contexto.dataset));
}

module.exports.calcularTaxasAcumuladasPorUsina = function (contexto) {

}