var config = {};

const DOMAIN_PORT = 8087;
const DOMAIN_HOST = 'localhost';

config.DOMAIN_PORT = DOMAIN_PORT;
config.DOMAIN_HOST = DOMAIN_HOST;

config.PORT = 8181;
config.URL_CENARIO_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/cenario`;

config.URL_CENARIO_SAGER_PERSIST = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/persist`;

config.URL_USINA_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/usina`;

config.URL_UGE_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/unidadegeradora`;

config.URL_REGRA_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantercenario/regracenario`;

config.getUrlFiltroCenario = function (nomeCenario) {
    return `${config.URL_CENARIO_SAGER}?filter=byNome&nomeCenario=${nomeCenario}`;
}

config.getUrlFiltroUnidadeGeradora = function (idUsina) {
    return `${config.URL_UGE_SAGER}?filter=byIdUsina&idUsina=${idUsina}`;
}

config.getUrlFiltroCenarioPorId = function (idCenario) {
    // TODO o filtro deveria ser byIdCenario, mas teve erro de atualização do mapa, apenas funciona com byId
    return `${config.URL_CENARIO_SAGER}?filter=byIdCenario&idCenario=${idCenario}`;
}

config.getUrlFiltroRegrasPorIdCenario = function (idCenario) {
    return `${config.URL_REGRA_SAGER}?filter=byIdCenario&idCenario=${idCenario}`;
}

module.exports = config;