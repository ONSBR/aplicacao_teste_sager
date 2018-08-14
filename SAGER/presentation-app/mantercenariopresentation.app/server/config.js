var config = {};

const DOMAIN_PORT = 9110;
const DOMAIN_HOST = 'sager-domain';
const EVENT_MANAGER_HOST = 'event_manager';

config.DOMAIN_PORT = DOMAIN_PORT;
config.DOMAIN_HOST = DOMAIN_HOST;

config.PORT = process.env.PORT || 8181;
config.URL_CENARIO_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/cenario`;

config.URL_CENARIO_SAGER_PERSIST = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/persist`;

config.URL_USINA_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/usina`;

config.URL_UGE_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/unidadegeradora`;

config.URL_REGRA_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/regracenario`;

config.getUrlFiltroCenario = function (nomeCenario, dataInicial, dataFinal) {
    let url = `${config.URL_CENARIO_SAGER}?filter=byNomeAndData`;
    if(nomeCenario) {
        url = url.concat(`&nomeCenario=%${nomeCenario}%`);
    }
    if(dataInicial) {
        url = url.concat(`&dataInicial=${dataInicial}`);
    }
    if(dataFinal) {
        url = url.concat(`&dataFinal=${dataFinal}`);
    }
    return url;
}

config.getUrlFiltroUnidadeGeradora = function (idUsina) {
    return `${config.URL_UGE_SAGER}?filter=byIdUsina&idUsina=${idUsina}`;
}

config.getUrlFiltroCenarioPorId = function (idCenario) {
    // TODO o filtro deveria ser byIdCenario, mas teve erro de atualização do mapa, apenas funciona com byId
    return `${config.URL_CENARIO_SAGER}?filter=byIdCenario&id=${idCenario}`;
}

config.getUrlFiltroRegrasPorIdCenario = function (idCenario) {
    return `${config.URL_REGRA_SAGER}?filter=byIdCenario&idCenario=${idCenario}`;
}

config.getUrlFiltroUsina = function (idUsina) {
    return `${config.URL_USINA_SAGER}?filter=byIdUsina&idUsina=${idUsina}`;
}

config.getUrlFiltroEvents = function (filtersArray) {
    return `http://${EVENT_MANAGER_HOST}:8081/events` + objFilterToQueryString(filtersArray);
}

function objFilterToQueryString(filtersArray) {
    var queryString = "";
    var keys = Object.keys(filtersArray);
    for(var i=0; i < keys.length; i++) {
        if (queryString) {
            queryString += "&";
        }
        var key = keys[i];
        queryString += key + "=" + filtersArray[key];
    }
    if (queryString) {
        queryString = "?" + queryString;
    }
    return queryString;
}

module.exports = config;