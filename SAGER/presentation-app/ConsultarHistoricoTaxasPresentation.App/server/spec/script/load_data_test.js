const HttpClient = require("plataforma-sdk/http/client");
var httpClient = new HttpClient();

const DOMAIN_PORT = 2100;

var dataLoad = [];
dataLoad.push(tipoTaxaInitialLoad());

let tiposTaxa = dataLoad[0];

httpClient.post(getUrlAppDomain(), tiposTaxa).then(result => {
    console.log("Tipos de taxas incluídas: " + tiposTaxa.length);
}).catch(catch_error);

function catch_error(error) {
    console.error("error: " + error.stack);
}

function getUrlAppDomain() {
    return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/persist`;
}

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