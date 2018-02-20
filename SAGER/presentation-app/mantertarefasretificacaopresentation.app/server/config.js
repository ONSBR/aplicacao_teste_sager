var config = {};

const DOMAIN_PORT = 2153;
const DOMAIN_HOST = 'localhost';
const PROCESS_MEMORY_HOST = 'localhost';
const EVENT_MANAGER_HOST = 'localhost';

config.PORT = 8182;
config.URL_USINA_SAGER = `http://localhost:${DOMAIN_PORT}/listarusinas/usina`;

config.getUrlUnidadesGeradorasAPartirUsina = function getUrlUnidadesGeradorasAPartirUsina(idUsina) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/unidadegeradora?filter=byIdUsina&idUsina=${idUsina}`;
}

module.exports = config;