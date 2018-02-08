var EventoMudancaEstadoOperativo = require("../../process/entities/eventomudancaestadooperativo");
var UnidadeGeradora = require("../../process/entities/unidadegeradora");
var FileCsvToJson = require("./filecsvtojson");
var ResultadoTaxaUsina = require("./resultadotaxausina");
var moment = require('moment');
const utils = require("../../utils");

const formatDateExcel = "DD/MM/YYYY HH:mm";
const fileCsvToJson = new FileCsvToJson();

module.exports.file_mass_events_09_2014_ALUXG = function () {

    return fileCsvToJson.convert("mass_events_09_2014_ALUXG", (jsonObject) => {
        return mapCsvEvento(jsonObject);
    });
}

module.exports.file_mass_events_08_2014_ALUXG = function () {

    return fileCsvToJson.convert("mass_events_08_2014_ALUXG", (jsonObject) => {
        return mapCsvEvento(jsonObject);
    });
}

module.exports.file_mass_events_ALUXG_1 = function () {

    return fileCsvToJson.convert("mass_events_ALUXG_1", (jsonObject) => {
        return mapCsvEvento(jsonObject);
    });
}

module.exports.file_mass_events_ALUXG_2 = function () {

    return fileCsvToJson.convert("mass_events_ALUXG_2", (jsonObject) => {
        return mapCsvEvento(jsonObject);
    });
}

module.exports.file_mass_results_taxes_ALUXG = function () {

    return fileCsvToJson.convert("mass_results_taxes_ALUXG", (jsonObject) => {
        return mapCsvResultadoTaxaUsina(jsonObject);
    });
}

module.exports.file_mass_uge_ALUXG = function () {

    return fileCsvToJson.convert("mass_uge_ALUXG", (jsonObject) => {
        return mapCsvUge(jsonObject);
    });
}

function mapCsvEvento(jsonObject) {

    var evtEstOper = new EventoMudancaEstadoOperativo();
    evtEstOper.idEvento = jsonObject.desger_id;
    evtEstOper.idUge = jsonObject.uge_id;
    evtEstOper.idEstadoOperativo = jsonObject.tpestoper_id;
    evtEstOper.idCondicaoOperativa = jsonObject.panocr_id;
    evtEstOper.idClassificacaoOrigem = jsonObject.ogresdes_id;
    evtEstOper.potenciaDisponivel = jsonObject.valdisp;

    var dataVerificada = jsonObject.dtini_verif;
    if (dataVerificada) {
        evtEstOper.dataVerificada = moment(dataVerificada, formatDateExcel).toDate();
    }

    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper);

    return evtEstOper;

}

function mapCsvUge(jsonObject) {

    var uge = new UnidadeGeradora();
    uge.idUge = jsonObject.uge_id;
    uge.idUsina = jsonObject.usi_id;
    uge.potenciaDisponivel = parseFloat(jsonObject.val_potcalcindisp);

    var dataInicioOperacao = jsonObject.dtentrada;
    if (dataInicioOperacao) {
        uge.dataInicioOperacao = moment(dataInicioOperacao, formatDateExcel).toDate();
    }
    return uge;
}

function mapCsvResultadoTaxaUsina(jsonObject) {

    var resultado = new ResultadoTaxaUsina();

    resultado.idUsina = jsonObject.usina_id;
    resultado.mes = parseInt(jsonObject.mes_apur);
    resultado.ano = parseInt(jsonObject.ano_apur);
    resultado.teifames = utils.parserFloatPtb(jsonObject.val_teifames);
    resultado.teipmes = utils.parserFloatPtb(jsonObject.val_teipmes);
    resultado.teifaacum = utils.parserFloatPtb(jsonObject.val_teifaacum);
    resultado.teipacum = utils.parserFloatPtb(jsonObject.val_teipacum);

    return resultado;
}