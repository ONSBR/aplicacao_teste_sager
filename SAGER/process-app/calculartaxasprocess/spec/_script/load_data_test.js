const FileDataMass = require("../testmass/filedatamass");
const HttpClient = require("plataforma-sdk/http/client");
const FechamentoMensal = require("../../process/entities/fechamentomensal");
const Usina = require("../../process/entities/usina");
const utils = require("../../utils");
const Enumerable = require("linq");

var httpClient = new HttpClient();
const DOMAIN_PORT = 2182;

const MAPA = "calculartaxasprocess";

var dataLoad = [];
dataLoad.push(FileDataMass.file_mass_uge_ALUXG());
dataLoad.push(FileDataMass.file_mass_events_ALUXG_1());
dataLoad.push(FileDataMass.file_mass_events_ALUXG_2());

function catch_error(error) {
    console.error("error: " + error.stack);
}

function loadFechamento() {

    var fechamento_201412 = new FechamentoMensal();
    fechamento_201412.ano = 2014;
    fechamento_201412.mes = 12;

    var fechamento_201409 = new FechamentoMensal();
    fechamento_201409.ano = 2014;
    fechamento_201409.mes = 9;

    var url = getUrlAppDomain(null, null, "persist");

    httpClient.post(url, JSON.stringify([fechamento_201409, fechamento_201412])).then(results => {
        console.log("Fechamentos incluídos: " + JSON.stringify(Enumerable.from(results).select(it => {
            return {idFechamento: it.id, mes: it.mes, ano: it.ano }}).toArray()));
    }).catch(catch_error);

}

function getUrlAppDomain(map, entity, verb) {
    if (!map) {
        map = MAPA;
    }
    var url = `http://localhost:${DOMAIN_PORT}/${map}/`;
    if (entity) {
        url += `${entity}/`;
    }
    if (verb) {
        url += verb;
    }
    return url;
}


Promise.all(dataLoad).then(results => {

    var uges = results[0];
    var eventos = results[1].concat(results[2]);

    loadFechamento();

    var usina = new Usina();
    usina.idUsina = usina.nome = usina.tipo = usina.agente = "ALUXG";
    
    httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify([usina])).then(result => {
        console.log("Usina incluída: " + usina.idUsina);
    }).catch(catch_error);
        
    httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify(uges)).then(result => {
        console.log("Uges incluídas: " + Enumerable.from(uges).select(it => { return it.idUge }).toArray());
    }).catch(catch_error);

    httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify(eventos)).then(result => {
        console.log("Eventos incluídos: " + eventos.length);
    }).catch(catch_error);
    

}).catch(catch_error);
