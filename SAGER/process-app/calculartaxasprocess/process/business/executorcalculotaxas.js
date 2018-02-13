const utils = require("../../utils");
const ExecucaoCalculoFechamento = require("../entities/execucaocalculofechamento");
const Taxa = require("../entities/taxa");
const ParametroTaxa = require("../entities/parametrotaxa");
const FechamentoMensal = require("../entities/fechamentomensal");
const EventoMudancaEstadoOperativo = require("../entities/eventomudancaestadooperativo");
const constants = require("./constants");
const eventCatalog = require("../../metadados/eventcatalog");
const CalculoTaxasPeriodoUge = require("./calculotaxasperiodouge");
const CalculoTaxasPeriodoUsina = require("./calculotaxasperiodousina");
const PeriodoCalculo = require("./periodocalculo");
const extensions = require("../../extensions");

module.exports.executarCalculoTaxas = function (contexto, eventManager) {

    console.log("INICIO [executarCalculoTaxas].");

    // TODO e a função agregada, por exemplo, se existem as taxas já
    var evento = contexto.event;
    var dataset = contexto.dataset;
    var payload = evento.payload;

    var fechamento = dataset.fechamentomensal.collection.firstOrDefault(it => {
        return it.ano == payload.anoFechamento && it.mes == payload.mesFechamento;
    });

    // TODO deveria obter do contexto
    var dataAtual = evento.reference_date ? evento.reference_date : new Date();

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
    execucaoCalculo.protocolo = payload.mesFechamento.zeroFillLeft(4) + '/' + payload.anoFechamento;

    dataset.execucaocalculofechamento.insert(execucaoCalculo);

    var periodoCalculo = new PeriodoCalculo(payload.mesFechamento, payload.anoFechamento);

    var usinas = dataset.usina.collection;
    usinas.forEach(it => {

        eventManager.emit({
            name: "calculate.tax.request",
            payload: {
                idUsina: it.idUsina,
                idFechamento: fechamento.id,
                dataInicialEvento: periodoCalculo.dataInicio,
                dataFinalEvento: periodoCalculo.dataFim
            }
        }).then(result => {
            console.log("Usina: " + it.idUsina);
        }).catch(error => {
            console.log("Error Usina: " + error.stack);
        });
    });
}

module.exports.calcularTaxasMensaisPorUsina = function (contexto, eventManager) {

    console.log("INICIO [calcularTaxasMensaisPorUsina]: " +
        JSON.stringify(contexto.dataset.eventomudancaestadooperativo.collection.toArray().length)
    );

    var evento = contexto.event;
    var dataset = contexto.dataset;

    var fechamento = contexto.dataset.fechamentomensal.collection.firstOrDefault();

    var mes = fechamento.mes;
    var ano = fechamento.ano;

    var idUsina = evento.payload.idUsina;

    var uges = dataset.unidadegeradora.collection;
    var eventosEstOper = dataset.eventomudancaestadooperativo.collection;

    var periodoCalculo = new PeriodoCalculo(mes, ano);

    // TODO retirar pois teoricamente já foi filtrado no mapa
    eventosEstOper = eventosEstOper.where(it => {
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(it);
        return it.dataVerificadaEmSegundos >= periodoCalculo.dataInicioEmSegundos &&
            it.dataVerificadaEmSegundos < periodoCalculo.dataFimEmSegundos;
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

            updateOrCreateParametroTaxa(dataset, fechamento.id, calculoUge.unidadeGeradora.idUge,
                calculoParam.tipoParametro, calculoParam.qtdHoras);
        });

        updateOrCreateParametroTaxa(dataset, fechamento.id, calculoUge.unidadeGeradora.idUge,
            calculoUge.calculoParametroHP.tipoParametro, calculoUge.calculoParametroHP.qtdHoras);

    });

    updateOrCreateTaxa(dataset, fechamento.id, idUsina, constants.TipoTaxa.TEIPmes, calculoUsina.valorTeip);
    updateOrCreateTaxa(dataset, fechamento.id, idUsina, constants.TipoTaxa.TEIFAmes, calculoUsina.valorTeifa);

    var periodoAcumulado = new PeriodoCalculo(mes, ano, 60);

    // TODO depois alterar para funcionar por evento
    eventManager.emit({
        name: "calculate.tax.request",
        payload: {
            acumulada: true,
            idUsina: idUsina,
            idFechamento: fechamento.id,
            dataInicialEvento: periodoAcumulado.dataInicio,
            dataFinalEvento: periodoAcumulado.dataFim
        }
    }).then(result => {
        console.log("Usina: " + idUsina);
    }).catch(error => {
        console.log("Error Usina: " + error.stack);
    });

}

function updateOrCreateTaxa(dataset, idFechamento, idUsina, idTipoTaxa, valorTaxa) {
    var taxa = dataset.taxa.collection.firstOrDefault(it => {
        return it.idFechamento == idFechamento && it.idUsina == idUsina && it.idTipoTaxa == idTipoTaxa
    });
    if (taxa) {
        taxa.valorTaxa = valorTaxa;
        dataset.taxa.update(taxa);
    } else {
        dataset.taxa.insert(new Taxa(
            utils.guid(),
            valorTaxa,
            idTipoTaxa,
            idFechamento,
            idUsina
        ));
    }
}

function updateOrCreateParametroTaxa(dataset, idFechamento, idUge, idTipoParametro, valorParametro) {

    var paramTaxa = dataset.parametrotaxa.collection.firstOrDefault(it => {
        return it.idFechamento == idFechamento && it.idUge == idUge && it.idTipoParametro == idTipoParametro
    });
    if (paramTaxa) {
        paramTaxa.valorParametro = valorParametro;
        dataset.parametrotaxa.update(paramTaxa);
    } else {
        dataset.parametrotaxa.insert(new ParametroTaxa(
            utils.guid(),
            valorParametro,
            idTipoParametro,
            idUge,
            idFechamento
        ));
    }
}

module.exports.calcularTaxasAcumuladasPorUsina = function (contexto, eventManager) {

    console.log("INICIO [calcularTaxasAcumuladasPorUsina]: " +
        JSON.stringify(contexto.dataset.eventomudancaestadooperativo.collection.toArray().length)
    );

    var evento = contexto.event;
    var dataset = contexto.dataset;

    var fechamento = contexto.dataset.fechamentomensal.collection.firstOrDefault();

    var mes = fechamento.mes;
    var ano = fechamento.ano;

    var idUsina = evento.payload.idUsina;

    var uges = dataset.unidadegeradora.collection;
    var eventosEstOper = dataset.eventomudancaestadooperativo.collection;

    var periodoAcumulado = new PeriodoCalculo(mes, ano, 60);

    // TODO retirar pois teoricamente já foi filtrado no mapa
    eventosEstOper = eventosEstOper.where(it => {
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(it);
        return it.dataVerificadaEmSegundos >= periodoAcumulado.dataInicioEmSegundos &&
            it.dataVerificadaEmSegundos < periodoAcumulado.dataFimEmSegundos;
    });
    console.log("periodoAcumulado: " + JSON.stringify(periodoAcumulado));
    var calculosUges = [];
    uges.forEach(uge => {
        // Para ter o resultado para cada mes
        periodoAcumulado.mesAnoInterval.forEach(mesAno => {

            var periodoCalculo = new PeriodoCalculo(mesAno.mes, mesAno.ano);
            var calculoUge = new CalculoTaxasPeriodoUge(
                periodoCalculo, uge,
                eventosEstOper.where(it => {
                    return it.idUge == uge.idUge &&
                        it.dataVerificadaEmSegundos >= periodoCalculo.dataInicioEmSegundos &&
                        it.dataVerificadaEmSegundos < periodoCalculo.dataFimEmSegundos
                })
            );
            calculosUges.push(calculoUge);
        });
    });

    var calculoUsina = new CalculoTaxasPeriodoUsina(periodoAcumulado, idUsina, calculosUges);
    calculoUsina.calcular();

    // TODO verificar se não precisar gravar os parâmetros como o mensal, 
    // mas fica a dúvida salva para todos os 60 meses?

    updateOrCreateTaxa(dataset, fechamento.id, idUsina, constants.TipoTaxa.TEIPacum, calculoUsina.valorTeip);
    updateOrCreateTaxa(dataset, fechamento.id, idUsina, constants.TipoTaxa.TEIFAacum, calculoUsina.valorTeifa);

}