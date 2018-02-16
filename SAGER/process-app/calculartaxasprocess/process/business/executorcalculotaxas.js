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

    console.log("INICIO [calcularTaxasPorUsina-"+(acumulada?"Acumulada":"Mensal")+"]: totaleventos = " +
        JSON.stringify(contexto.dataset.eventomudancaestadooperativo.collection.toArray().length)
    );

    var totalMeses = acumulada? 60 : 1;
    var tipoTaxaTeip = acumulada? constants.TipoTaxa.TEIPacum : constants.TipoTaxa.TEIPmes;
    var tipoTaxaTeifa = acumulada? constants.TipoTaxa.TEIFAacum : constants.TipoTaxa.TEIFAmes

    var evento = contexto.event;
    var dataset = contexto.dataset;

    var fechamento = contexto.dataset.fechamentomensal.collection.firstOrDefault();

    var mes = fechamento.mes;
    var ano = fechamento.ano;

    var idUsina = evento.payload.idUsina;

    var uges = dataset.unidadegeradora.collection;
    var eventosEstOper = dataset.eventomudancaestadooperativo.collection;

    var periodoTotal = new PeriodoCalculo(mes, ano, totalMeses);

    eventosEstOper.forEach(it => {
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(it);
    });
    
    var calculosUges = [];
    uges.forEach(uge => {
        
        // Para ter o resultado para cada mes
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

    calculoUsina.calculosTaxasPeriodoUge.forEach(calculoUge => {

        calculoUge.contadorEventos.listaCalculoTipoParametrosEventos.forEach(calculoParam => {

            createParametroTaxa(dataset, fechamento.id, calculoUge.unidadeGeradora.idUge,
                calculoParam.tipoParametro, calculoParam.qtdHoras,
                evento.payload.idExecucaoCalculo, calculoUge.periodoCalculo.mes, calculoUge.periodoCalculo.ano
            );
        });

        createParametroTaxa(dataset, fechamento.id, calculoUge.unidadeGeradora.idUge,
            calculoUge.calculoParametroHP.tipoParametro, calculoUge.calculoParametroHP.qtdHoras,
            evento.payload.idExecucaoCalculo, calculoUge.periodoCalculo.mes, calculoUge.periodoCalculo.ano
        );

    });

    // cria ou atualiza as taxas teip ou teifa
    updateOrCreateTaxa(dataset, fechamento.id, idUsina, tipoTaxaTeip, calculoUsina.valorTeip);
    updateOrCreateTaxa(dataset, fechamento.id, idUsina, tipoTaxaTeifa, calculoUsina.valorTeifa);
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

/**
 * @function createParametroTaxa
 * @param {DataSet} dataset 
 * @param {string} idFechamento 
 * @param {string} idUge 
 * @param {string} idTipoParametro 
 * @param {float} valorParametro 
 * @param {string} idExecucaoCalculo 
 * @param {int} mes 
 * @param {int} ano 
 * 
 * @description Função responsável por criar e adicionar no dataset, um parâmetro de taxa para uma execução de cálculo.
 */
function createParametroTaxa(dataset, idFechamento, idUge, idTipoParametro, valorParametro, idExecucaoCalculo, mes, ano) {

    dataset.parametrotaxa.insert(new ParametroTaxa(
        utils.guid(),
        valorParametro, idTipoParametro, idUge,
        idFechamento, idExecucaoCalculo, mes, ano
    ));
}
