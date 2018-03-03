var config = {};

const DOMAIN_PORT = 2117;
const DOMAIN_HOST = 'localhost';
const PROCESS_MEMORY_HOST = 'localhost';
const EVENT_MANAGER_HOST = 'localhost';

config.PORT = 8182;
config.URL_USINA_SAGER = `http://localhost:${DOMAIN_PORT}/mantertarefas/usina`;
config.URL_TAREFAS = `http://localhost:${DOMAIN_PORT}/mantertarefas/tarefaretificacao`;

config.getUrlUnidadesGeradorasAPartirUsina = function getUrlUnidadesGeradorasAPartirUsina(idsUsinas) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/unidadegeradora?filter=byIdUsina&idsUsinas=${idsUsinas}`;
}

config.getUrlFiltroEventoPorDataseUGes = function getUrlFiltroEventoPorDataseUGes(idsUges, dataInicial, dataFinal) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/eventomudancaestadooperativo?filter=byIntervaloDatas&dataInicial=${dataInicial}&dataFinal=${dataFinal}=&idsUges=${idsUges}`;
}

config.getUrlInserirTarefa = function getUrlInserirTarefa() {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/persist`;
}

config.getEventosRetificacaoPorNomeTarefa = function getEventosRetificacaoPorNomeTarefa(nomeTarefa) {
    return `http://localhost:${DOMAIN_PORT}/mantertarefas/eventomudancaestadooperativotarefa?filter=byNomeTarefa&nometarefa=${nomeTarefa}`;
}


module.exports = config;