var config = {};

let DOMAIN_PORT = 2171;

config.PORT = 8181;
config.URL_USINA_SAGER = `http://localhost:${DOMAIN_PORT}/listarusinas/usina`;
config.URL_TIPO_TAXA_SAGER = `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/tipo-taxa`;

config.getUrlFiltroExecucao = function getUrlFiltroExecucao(dataInicio, dataFim) {
    return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/execucao-calculo-fechamento?filter=byDataInicioFim&dataInicio=${dataInicio}&dataFim=${dataFim}`;
}

config.getUrlFiltroTaxas = function getUrlFiltroTaxas(idUsina, tipoTaxaId) {
    return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byUsinaETipoTaxa&idUsina=${idUsina}&tipoTaxa=${tipoTaxaId}`;
}

config.getUrlFiltroFechamentos =
    function getUrlFiltroFechamentos(mesInicial, anoInicial, mesFinal, anoFinal, idsFechamento) {
        return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/fechamento-mensal?filter=byIdsAndData&mesInicial=${mesInicial}&anoInicial=${anoInicial}&mesFinal=${mesFinal}&anoFinal=${anoFinal}&ids=${idsFechamento}`;
    }

module.exports = config;