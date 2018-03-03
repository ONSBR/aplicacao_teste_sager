var config = {};

<<<<<<< HEAD
const DOMAIN_PORT = 2137;
=======
const DOMAIN_PORT = 2166;
>>>>>>> 494a5f126920397e150b97b58f90c5770bbf0f74
const DOMAIN_HOST = 'localhost';
const PROCESS_MEMORY_HOST = 'localhost';
const EVENT_MANAGER_HOST = 'localhost';

const CORE_HOST = 'localhost';
const CORE_PORT = 9110;

config.PORT = 8181;
config.URL_USINA_SAGER = `http://localhost:${DOMAIN_PORT}/listarusinas/usina`;
config.URL_TIPO_TAXA_SAGER = `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/tipotaxa`;

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