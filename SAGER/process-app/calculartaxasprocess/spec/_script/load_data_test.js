const FileDataMass = require("../testmass/filedatamass");
const HttpClient = require("plataforma-sdk/http/client");
const FechamentoMensal = require("../../process/entities/fechamentomensal");
const Usina = require("../../process/entities/usina");
const Enumerable = require("linq");

var httpClient = new HttpClient();
const DOMAIN_PORT = 8087;

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
    console.log('---------');
    console.log(url);
    return url;
}

function postEventos() {
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

    loadFechamento();

    let usina = new Usina();
    usina.idUsina = usina.nome = usina.tipo = usina.agente = "ALUXG";
    usina.franquia = 1000;
    
    httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify([usina])).then(result => {
        console.log("Usina incluída: " + usina.idUsina);
        console.log(usina);
    }).catch(catch_error);
        
    httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify(uges)).then(result => {
        console.log("Uges incluídas: " + Enumerable.from(uges).select(it => { return it.idUge }).toArray());
    }).catch(catch_error);

    const lenpage = 10000;
    for(var i=0;i<eventos.length;i+=lenpage) {
        var pageslice = i+lenpage >= eventos.length? eventos.length: i+lenpage;
        eventosToSend.push(eventos.slice(i, pageslice));
    }
    console.log("eventosToSend.length: "+eventosToSend.length);
    postEventos();

    
/*
eventos = [eventos[8144]];

    var oj = [];
    var proevt = [];
    for(var i =0;i< eventos.length;i++) {
        proevt.push(httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify([eventos[i]])).then(result => {
            console.log("Eventos incluídos: " + eventos.length);
            //oj.push(result[0].idEvento);
        }).catch(error => { console.log(error) }));//.catch(catch_error);
    }
    
    Promise.all(proevt).then(data => {
        var total = 0;
        console.log('oj: ' + JSON.stringify(oj))
        for(var i =0;i< eventos.length;i++) {
            var evento = eventos[i];
            if (oj.indexOf(evento.idEvento)<0) {
                total++;
                console.log('error['+i+']: ' +evento.idEvento  );
            }
        }
        console.log('total: ' +total );
    });
*/
}).catch(catch_error);
