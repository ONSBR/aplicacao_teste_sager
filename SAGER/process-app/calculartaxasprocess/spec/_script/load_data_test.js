const FileDataMass = require("../testmass/filedatamass");
const HttpClient = require("plataforma-sdk/http/client");
const FechamentoMensal = require("../../process/entities/fechamentomensal");
const Usina = require("../../process/entities/usina");
const FranquiaUnidadeGeradora = require("../../process/entities/franquiaunidadegeradora");
const PotenciaUnidadeGeradora = require("../../process/entities/potenciaunidadegeradora");
const ClassificacaoOrigemEvento = require("../../process/entities/classificacaoorigemevento");
const CondicaoOperativaEvento = require("../../process/entities/condicaooperativaevento");
const EstadoOperativoEvento = require("../../process/entities/estadooperativoevento");
const Enumerable = require("linq");
const FRANQUIA = 1000;

var httpClient = new HttpClient();

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

function loadFranquiasUnidadesGeradoras(uges) {
    let franquias = [];
    uges.forEach(uge => {
        uge.franquiaGICHorasLimite = 960;
        uge.franquiaGICTempoLimiteAntes102014 = 15000;
        uge.franquiaGICTempoLimiteApos102014 = 24;
        uge.franquiaGMTHorasLimiteAntes01102014 = 72;
        uge.franquiaGMTHorasLimiteAPartir01102014 = 360;
        uge.franquiaGIMRestricaoTempo = 120;
        uge.franquiaGIMTempoLimiteAntes01102014 = 12;
        uge.franquiaGIMTempoLimiteApos01102014 = 12;

        let franquia = new FranquiaUnidadeGeradora();
        franquia.idUge = uge.idUge;
        franquia.franquia = FRANQUIA;
        // franquias.push(franquia);
    });

    let url = getUrlAppDomain(null, null, "persist");
    httpClient.post(url, JSON.stringify(franquias)).then(results => {
        console.log("Franquias incluídas:");
    }).catch(catch_error);
}

function loadPotenciasUnidadesGeradoras(uges) {
    let potencias = [];
    uges.forEach(uge => {
        let potencia = new PotenciaUnidadeGeradora();
        potencia.idUge = uge.idUge;
        potencia.potenciaDisponivel = uge.potenciaDisponivel;
        // potencias.push(potencia);
    });

    let url = getUrlAppDomain(null, null, "persist");
    httpClient.post(url, JSON.stringify(potencias)).then(results => {
        console.log("Potências incluídas:");
    }).catch(catch_error);
}

function getUrlAppDomain(map, entity, verb) {
    if (!map) {
        map = MAPA;
    }
    var url = `http://localhost/domain/${map}/`;
    if (entity) {
        url += `${entity}/`;
    }
    if (verb) {
        url += verb;
    }
    return url;
}

function postEventos() {
    console.log('postEventos');
    if (posevt < eventosToSend.length) {
        var eventos = eventosToSend[posevt];
        if (eventos) {
            var url = getUrlAppDomain(null, null, "persist");
            console.log('url: ' + url);
            return httpClient.post(url, JSON.stringify(eventos)).then(result => {
                console.log("Eventos incluídos[" + posevt + "]: " + result.length);
                posevt++;
                postEventos();
            }).catch(error => {
                console.error("error[" + posevt + "]: " + error.stack);
                console.log("Eventos : " + JSON.stringify(eventosToSend[posevt]));
                posevt++;
                postEventos();
            });
        }
    }
}

var eventosToSend = [];
var posevt = 0;

Promise.all(dataLoad).then(results => {

    let uges = results[0];
    let eventos = results[1].concat(results[2]);

    loadFranquiasUnidadesGeradoras(uges);
    loadPotenciasUnidadesGeradoras(uges);
    loadFechamento();

    let usina = new Usina();
    usina.idUsina = usina.nome = usina.tipo = usina.agente = "ALUXG";
    
    httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify([usina])).then(result => {
        console.log("Usina incluída: " + usina.idUsina);
    }).catch(catch_error);
        
    httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify(uges)).then(result => {
        console.log("Uges incluídas: " + Enumerable.from(uges).select(it => { return it.idUge }).toArray());
    }).catch(catch_error);

    const lenpage = 1000;
    for(var i=0;i<eventos.length;i+=lenpage) {
        var pageslice = i+lenpage >= eventos.length? eventos.length: i+lenpage;
        eventosToSend.push(eventos.slice(i, pageslice));
    }

    postEventos();
    
}).catch(catch_error);
