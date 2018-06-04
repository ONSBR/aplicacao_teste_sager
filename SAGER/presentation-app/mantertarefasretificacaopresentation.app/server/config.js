var config = {};

const DOMAIN_PORT = 9110;
const DOMAIN_HOST = 'sager-domain';
const PROCESS_MEMORY_HOST = 'process_memory';
const EVENT_MANAGER_HOST = 'event_manager';

config.PORT = process.env.PORT || 8182;
config.URL_USINA_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/usina`;
config.URL_TAREFAS = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/tarefaretificacao`;

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
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/eventomudancaestadooperativotarefa?filter=byNomeTarefa&nomeTarefa=${nomeTarefa}`;
}

config.getUrlConsultaEventoMudancaEstadoPorIds = function(idsEventos) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/eventomudancaestadooperativo?filter=byIdsEventos&idsEventos=${idsEventos}`;
}

config.getUrlPersist = function() {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/persist`;
}

config.getEventManagerUrl = function () {
    return `http://${EVENT_MANAGER_HOST}:8081/sendevent`
}

config.getUrlConsultaFechamentosPorMesAno = function(mesFechamento, anoFechamento) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/fechamentomensal?filter=byAcimaMesAno&mesFechamento=${mesFechamento}&anoFechamento=${anoFechamento}`;
}

config.getUrlRetificacaoPorNomeTarefa = function (nomeTarefa) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/tarefaretificacao?filter=byNomeTarefa&nomeTarefa=${nomeTarefa}`;
}

config.getUrlRetificacaoPorNomeTarefa = function (nomeTarefa) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/tarefaretificacao?filter=byNomeTarefa&nomeTarefa=${nomeTarefa}`;
}

config.getUrlEventosMenorQueData = function (data) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/eventomudancaestadooperativo?filter=menorQueData&data=${data}`;
}

config.getUrlEventosMaiorQueData = function (data) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/mantertarefas/eventomudancaestadooperativo?filter=maiorQueData&data=${data}`;
}

filters:
    byName: "nome = :nome"

module.exports = config;
