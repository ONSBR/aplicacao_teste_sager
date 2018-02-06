var config = {};

const DOMAIN_PORT = 2196;

config.PORT = 8181;
config.URL_USINA_SAGER = `http://localhost:${DOMAIN_PORT}/listarusinas/usina`;
config.URL_TIPO_TAXA_SAGER = `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/tipo-taxa`;

config.getUrlFiltroExecucao = function getUrlFiltroExecucao(idsFechamento) {
    return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/execucao-calculo-fechamento?filter=byIdsFechamentos&idsFechamentos=${idsFechamento}`;
}

config.getUrlFiltroTaxas = function getUrlFiltroTaxas(idUsina, tipoTaxaId) {
    return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byUsinaETipoTaxa&idUsina=${idUsina}&tipoTaxa=${tipoTaxaId}`;
}

config.getUrlFiltroFechamentos =
    function getUrlFiltroFechamentos(mesInicial, anoInicial, mesFinal, anoFinal, idsFechamento) {
        return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/fechamento-mensal?filter=byIdsAndData&mesInicial=${mesInicial}&anoInicial=${anoInicial}&mesFinal=${mesFinal}&anoFinal=${anoFinal}&ids=${idsFechamento}`;
    }

config.getUrlFiltroTaxasAPartirIdFechamento = 
    function getUrlFiltroTaxasAPartirIdFechamento(idFechamento){
        return `http://localhost:${DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byIdFechamento&idFechamento=${idFechamento}`
    }

module.exports = config;