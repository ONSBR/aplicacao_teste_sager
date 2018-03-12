const HttpClient = require("plataforma-sdk/http/client");
var httpClient = new HttpClient(); 

const DOMAIN_PORT = 2174;

var dataLoad = [];
dataLoad.push(tipoTaxaInitialLoad());

function catch_error(error) {
    console.error("error: " + error.stack);
}

function getUrlAppDomain() {
    return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/persist`;
}

Promise.all(dataLoad).then(results => {

    let tiposTaxa = results[0];

    httpClient.post(getUrlAppDomain(), tiposTaxa).then(result => {
        console.log("Tipos de taxas incluídas: " + tiposTaxa.length);
    }).catch(catch_error);

}).catch(catch_error);

function tipoTaxaInitialLoad() {
    return [
        {
            "nome": "TEIPmes",
            "idTipoTaxa":"TEIPmes",
            "_metadata": {
                "type": "tipotaxa",
                "changeTrack":"create",
                "branch":"master"
            }
        }, {
            "nome": "TEIFAmes",
            "idTipoTaxa":"TEIFAmes",
            "_metadata": {
                "type": "tipotaxa",
                "changeTrack":"create",
                "branch":"master"
            }
        }, {
            "nome": "TEIPac",
            "idTipoTaxa":"TEIPac",
            "_metadata": {
                "type": "tipotaxa",
                "changeTrack":"create",
                "branch":"master"
            }
        }, {
            "nome": "TEIFAac",
            "idTipoTaxa":"TEIFAac",
            "_metadata": {
                "type": "tipotaxa",
                "changeTrack":"create",
                "branch":"master"
            }
        }
    ];
}