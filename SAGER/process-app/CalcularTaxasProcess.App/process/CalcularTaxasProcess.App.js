const utils = require("../utils");
const ExecucaoCalculoFechamento = require("./entities/execucaoCalculoFechamento");
const Taxa = require("./entities/taxa");
const ParametroTaxa = require("./entities/parametroTaxa");
const constants = require("./business/constants");
const eventCatalog = require("../metadados/eventCatalog");
const CalculoTaxasMensaisUge = require("./business/calculoTaxasMensaisUge");
const CalculoTaxasMensaisUsina = require("./business/calculoTaxasMensaisUsina");

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
            payload: { idUsina: it.id, fechamento: fechamento }
        });
    });

}

module.exports.calcularTaxasMensaisPorUsina = function (contexto) {

    var evento = contexto.evento;
    var dataSet = contexto.dataSet;

    var mes = evento.payload.fechamento.mes;
    var ano = evento.payload.fechamento.ano;
    var idUsina = evento.payload.idUsina;

    var uges = dataSet.UnidadeGeradora.collection;
    var eventosEstOper = dataSet.EventoMudancaEstadoOperativo.collection;

    var mesCompare = mes - 1;
    eventosEstOper = eventosEstOper.where(it => {
        return it.dataVerificada && (it.dataVerificada.getYear() + 1900) == ano
            && it.dataVerificada.getMonth() == mesCompare;
    });

    var calculosUges = [];
    uges.forEach(uge => {
        var calculoUge = new CalculoTaxasMensaisUge(
            mes, ano, uge,
            eventosEstOper.where(it => { return it.idUge == uge.id })
        );
        calculosUges.push(calculoUge);
    });

    var calculoUsina = new CalculoTaxasMensaisUsina(mes, ano, idUsina, calculosUges);
    calculoUsina.calcular();

    calculoUsina.calculosTaxasMensaisUge.forEach(calculoUge => {

        calculoUge.contadorEventos.listaCalculoTipoParametrosEventos.forEach(calculoParam => {
            dataSet.ParametroTaxa.insert(new ParametroTaxa(
                utils.guid(),
                calculoParam.qtdHoras,
                calculoParam.tipoParametro
            ));
        });

        dataSet.ParametroTaxa.insert(new ParametroTaxa(
            utils.guid(),
            calculoUge.calculoParametroHP.qtdHoras,
            calculoUge.calculoParametroHP.tipoParametro
        ));

    });

    dataSet.Taxa.insert(new Taxa(
        utils.guid(),
        calculoUsina.valorTeip,
        constants.TipoTaxa.TEIP
    ));

    dataSet.Taxa.insert(new Taxa(
        utils.guid(),
        calculoUsina.valorTeifa,
        constants.TipoTaxa.TEIFA
    ));

    contexto.eventoSaida = {
        name: eventCatalog.calcular_taxas_acumuladas,
        payload: evento.payload
    };
}

module.exports.calcularTaxasAcumuladasPorUsina = function (contexto) {

}