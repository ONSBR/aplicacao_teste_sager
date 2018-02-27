const utils = require("../../utils");
const ExecucaoCalculoFechamento = require("../entities/execucaocalculofechamento");
const Taxa = require("../entities/taxa");
const ParametroTaxa = require("../entities/parametrotaxa");
const FechamentoMensal = require("../entities/fechamentomensal");
const EventoMudancaEstadoOperativo = require("../entities/eventomudancaestadooperativo");
const constants = require("./constants");
const CalculoTaxasPeriodoUge = require("./calculotaxasperiodouge");
const CalculoTaxasPeriodoUsina = require("./calculotaxasperiodousina");
const PeriodoCalculo = require("./periodocalculo");
const extensions = require("../../extensions");

/**
 * @description Responsável por executar as regras de negócio de cálculos de taxas, de teip e teifa,
 * tanto mensal quanto acumulada.
 * O que difere o cálculo de mensal para acumulado é o período, 1 e 60 meses, respectivamente.
 * 
 * @param {Context} contexto 
 */
module.exports.calcularTaxasPorUsina = function (contexto) {

    var acumulada = contexto.event.payload.acumulada;

    console.log("INICIO [calcularTaxasPorUsina-" + (acumulada ? "Acumulada" : "Mensal") + "]: totaleventos = " +
        JSON.stringify(contexto.dataset.eventomudancaestadooperativo.collection.toArray().length)
    );

    // define as variaveis para tipo mensal e acumulada.
    var totalMeses = acumulada ? 60 : 1; 
    var tipoTaxaTeip = acumulada ? constants.TipoTaxa.TEIPacum : constants.TipoTaxa.TEIPmes;
    var tipoTaxaTeifa = acumulada ? constants.TipoTaxa.TEIFAacum : constants.TipoTaxa.TEIFAmes

    var evento = contexto.event;
    var dataset = contexto.dataset; 

    var fechamento = contexto.dataset.fechamentomensal.collection.firstOrDefault();

    var idUsina = evento.payload.idUsina;

    var uges = dataset.unidadegeradora.collection;
    var eventosEstOper = dataset.eventomudancaestadooperativo.collection;

    var periodoTotal = new PeriodoCalculo(fechamento.mes, fechamento.ano, totalMeses);

    eventosEstOper.forEach(it => {
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(it);
    });

    var calculosUges = [];
    uges.forEach(uge => {

        // Para ter o resultado para cada mes, no mensal teremos apenas 1.
        periodoTotal.mesAnoInterval.forEach(mesAno => {

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

    var calculoUsina = new CalculoTaxasPeriodoUsina(periodoTotal, idUsina, calculosUges);
    calculoUsina.calcular();

    adicionarParametrosTaxas(
        calculoUsina.calculosTaxasPeriodoUge, dataset, 
        fechamento.id, evento.payload.idExecucaoCalculo
    );

    // cria ou atualiza as taxas teip ou teifa
    updateOrCreateTaxa(dataset, fechamento.id, idUsina, tipoTaxaTeip, calculoUsina.valorTeip);
    updateOrCreateTaxa(dataset, fechamento.id, idUsina, tipoTaxaTeifa, calculoUsina.valorTeifa);
}

/**
 * @description Gera os parâmetros de taxas para as unidades geradoras.
 * @param {CalculoTaxasPeriodoUge[]} calculosTaxasPeriodoUge 
 * @param {DataSet} dataset 
 * @param {int} idFechamento 
 * @param {int} idExecucaoCalculo 
 */
function adicionarParametrosTaxas(calculosTaxasPeriodoUge, dataset, idFechamento, idExecucaoCalculo) {
    
    calculosTaxasPeriodoUge.forEach(calculoUge => {

        calculoUge.contadorEventos.listaCalculoTipoParametrosEventos.forEach(calculoParam => {

            dataset.parametrotaxa.insert(new ParametroTaxa(
                utils.guid(),
                calculoParam.qtdHoras, calculoParam.tipoParametro, calculoUge.unidadeGeradora.idUge,
                idFechamento, idExecucaoCalculo, calculoUge.periodoCalculo.mes, 
                calculoUge.periodoCalculo.ano
            ));

        });

        dataset.parametrotaxa.insert(new ParametroTaxa(
            utils.guid(),
            calculoUge.calculoParametroHP.qtdHoras, calculoUge.calculoParametroHP.tipoParametro, 
            calculoUge.unidadeGeradora.idUge, idFechamento, idExecucaoCalculo, 
            calculoUge.periodoCalculo.mes, calculoUge.periodoCalculo.ano
        ));

    });
}

/**
 * @function updateOrCreateTaxa
 * @param {DataSet} dataset 
 * @param {string} idFechamento 
 * @param {string} idUsina 
 * @param {string} idTipoTaxa 
 * @param {float} valorTaxa 
 * 
 * @description Função responsável por criar ou atualizar a taxa do dataset que está sendo gerada no cálculo.
 */
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
