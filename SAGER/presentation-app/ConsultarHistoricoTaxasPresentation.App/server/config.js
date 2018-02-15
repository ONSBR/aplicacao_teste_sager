var config = {};

const DOMAIN_PORT = 2100;

config.PORT = 8181;
config.URL_USINA_SAGER = `http://localhost:${DOMAIN_PORT}/listarusinas/usina`;
config.URL_TIPO_TAXA_SAGER = `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/tipotaxa`;

config.getUrlFiltroExecucao = function getUrlFiltroExecucao(idsFechamento) {
    return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/execucaocalculofechamento?filter=byIdsFechamentos&idsFechamentos=${idsFechamento}`;
}

config.getUrlFiltroTaxas = function getUrlFiltroTaxas(idUsina, tipoTaxaId, idsFechamentos) {
    return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byUsinaTipoTaxaIdsFechamentos&idUsina=${idUsina}&tipoTaxa=${tipoTaxaId}&idsFechamentos=${idsFechamentos}`;
}

config.getUrlFiltroFechamentos =
    function getUrlFiltroFechamentos(mesInicial, anoInicial, mesFinal, anoFinal) {
        return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/fechamentomensal?filter=byData&mesInicial=${mesInicial}&anoInicial=${anoInicial}&mesFinal=${mesFinal}&anoFinal=${anoFinal}`;
    }

config.getUrlFiltroTaxasAPartirIdFechamento =
    function getUrlFiltroTaxasAPartirIdFechamento(idFechamento) {
        return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byIdFechamento&idFechamento=${idFechamento}`
    }

config.getUrlFiltroFechamentoMensalPorId =
    function getUrlFiltroFechamentosMensaisPorId(idFechamento) {
        return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/fechamentomensal?filter=byId&id=${idFechamento}`
    }

config.getProcessMemoryUrl =
    function getProcessMemoryUrl(processInstanceId) {
        return `http://localhost:9091/${processInstanceId}/head`
    }



module.exports = config;