const ExecucaoCalculoFechamento = require("../entities/execucaocalculofechamento");
const FechamentoMensal = require("../entities/fechamentomensal");
const eventCatalog = require("../../metadados/eventcatalog");
const utils = require("../../utils");
const extensions = require("../../extensions");
const PeriodoCalculo = require("./periodocalculo");

/**
 * @description Inicia a execução dos cálculos de taxas para o fechamento, para todas as usina.
 * Dispara a solicitação de cálculo de taxa para todas as usinas do sistema.
 *
 * @param {Context} contexto
 * @param {EventManagerClient} eventManager
 */
module.exports.executarCalculoTaxas = function (contexto, eventManager) {

    console.log("INICIO [executarCalculoTaxas].");

    var evento = contexto.event;
    var dataset = contexto.dataset;
    var payload = evento.payload;

    var fechamento = dataset.fechamentomensal.collection.firstOrDefault(it => {
        return it.ano == payload.anoFechamento && it.mes == payload.mesFechamento;
    });

    var dataAtual = evento.reference_date ? evento.reference_date : new Date();

    if (!fechamento) {
        // Na aplicação de testes o fechamento por não existir,
        // então é criada para efeito de cálculo
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
    var periodoAcumulado = new PeriodoCalculo(payload.mesFechamento, payload.anoFechamento, 60);

    var usinas = dataset.usina.collection;
    usinas.forEach(it => {

        if (fechamento.mes < 10 && fechamento.ano < 2014) {
            eventEmitTaxByUsina(eventManager, {
                idUsina: it.idUsina,
                idFechamento: fechamento.id,
                mesFechamento: fechamento.mes,
                anoFechamento: fechamento.ano,
                idExecucaoCalculo: execucaoCalculo.id,
                dataInicialEvento: periodoCalculo.dataInicio,
                dataFinalEvento: periodoCalculo.dataFim
            });
        }

        eventEmitTaxByUsina(eventManager, {
            acumulada: true,
            idUsina: it.idUsina,
            idFechamento: fechamento.id,
            mesFechamento: fechamento.mes,
            anoFechamento: fechamento.ano,
            idExecucaoCalculo: execucaoCalculo.id,
            dataInicialEvento: periodoAcumulado.dataInicio,
            dataFinalEvento: periodoAcumulado.dataFim
        });
    });
}

/**
 * @description Responsável por emitir os eventos de execução do cálculo de taxas para as usinas,
 * tanto taxas mensais quanto acumuladas.
 *
 * @function eventEmitTaxByUsina
 * @param {EventManagerClient} eventManager
 * @param {json} _payload
 */
function eventEmitTaxByUsina(eventManager, _payload) {

    eventManager.emit({
        name: eventCatalog.calculate_tax_by_usina,
        payload: _payload
    }).then(it => {
        console.log("Evento disparado");
    }).catch(error => {
        console.log("Error Usina: " + error.stack);
    });

}