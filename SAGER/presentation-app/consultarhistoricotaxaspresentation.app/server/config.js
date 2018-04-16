var config = {};

const DOMAIN_PORT = 9110;
const DOMAIN_HOST = 'sager-domain';
const PROCESS_MEMORY_HOST = 'processmemory';
const EVENT_MANAGER_HOST = 'event-manager';

const CORE_HOST = 'apicore';
const CORE_PORT = 9110;

config.DOMAIN_PORT = DOMAIN_PORT;
config.DOMAIN_HOST = DOMAIN_HOST;
config.PROCESS_MEMORY_HOST = PROCESS_MEMORY_HOST;
config.EVENT_MANAGER_HOST = EVENT_MANAGER_HOST;

config.CORE_HOST = CORE_HOST;
config.CORE_PORT = CORE_PORT;

config.PORT = process.env.PORT || 8181;
config.URL_USINA_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/consultarhistoricotaxas/usina`;
config.URL_TIPO_TAXA_SAGER = `http://${DOMAIN_HOST}:${DOMAIN_PORT}/consultarhistoricotaxas/tipotaxa`;

config.getUrlFiltroExecucao = function getUrlFiltroExecucao(idsFechamento) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/consultarhistoricotaxas/execucaocalculofechamento?filter=byIdsFechamentos&idsFechamentos=${idsFechamento}`;
}

config.getUrlFiltroTaxas = function getUrlFiltroTaxas(idUsina, tipoTaxaId, idsFechamentos) {
    return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byUsinaTipoTaxaIdsFechamentos&idUsina=${idUsina}&tipoTaxa=${tipoTaxaId}&idsFechamentos=${idsFechamentos}`;
}

config.getUrlFiltroFechamentos =
    function getUrlFiltroFechamentos(mesInicial, anoInicial, mesFinal, anoFinal) {
        return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/consultarhistoricotaxas/fechamentomensal?filter=byData&mesInicial=${mesInicial}&anoInicial=${anoInicial}&mesFinal=${mesFinal}&anoFinal=${anoFinal}`;
    }

config.getUrlFiltroTaxasAPartirIdFechamento =
    function getUrlFiltroTaxasAPartirIdFechamento(idFechamento) {
        return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byIdFechamento&idFechamento=${idFechamento}`
    }

config.getUrlFiltroFechamentoMensalPorId =
    function getUrlFiltroFechamentosMensaisPorId(idFechamento) {
        return `http://${DOMAIN_HOST}:${DOMAIN_PORT}/consultarhistoricotaxas/fechamentomensal?filter=byId&id=${idFechamento}`
    }

config.getProcessMemoryUrl =
    function getProcessMemoryUrl(processInstanceId) {
        return `http://${PROCESS_MEMORY_HOST}:9091/${processInstanceId}/head`
    }

config.getEventManagerUrl = function () {
    return `http://${EVENT_MANAGER_HOST}:8081/sendevent`
}

config.getCoreUrl = function (entityCore, filter) {

    var retorno = `http://${CORE_HOST}:${CORE_PORT}/core/`;
    if (entityCore) {
        retorno += entityCore;
    }

    if (filter) {
        retorno += "?" + filter;
    }

    return retorno;
}

module.exports = config;