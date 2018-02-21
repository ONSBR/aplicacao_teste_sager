var config = {};

const DOMAIN_PORT = 2145;
const DOMAIN_HOST = 'localhost';
const PROCESS_MEMORY_HOST = 'localhost';
const EVENT_MANAGER_HOST = 'localhost';

config.PORT = 8182;
config.URL_USINA_SAGER = `http://localhost:${DOMAIN_PORT}/listarusinas/usina`;

config.getUrlUnidadesGeradorasAPartirUsina = function getUrlUnidadesGeradorasAPartirUsina(idUsina) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/unidadegeradora?filter=byIdUsina&idUsina=${idUsina}`;
}

config.getUrlFiltroEventoPorDataseUGes = function getUrlFiltroEventoPorDataseUGes(idsUges, dataInicial, dataFinal) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/eventomudancaestadooperativo?filter=byIntervaloDatas&dataInicial=${dataInicial}&dataFinal=${dataFinal}=&idsUges=${idsUges}`;
}

module.exports = config;