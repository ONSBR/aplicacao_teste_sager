var config = {};

config.PORT = 8181;
config.urlUsinaSAGER = 'http://localhost:2149/listarusinas/usina';
config.urlTipoTaxaSAGER = 'http://localhost:2149/consultarhistoricotaxas/tipo-taxa';

config.getUrlFiltroExecucao = function getUrlFiltroExecucao(dataInicio, dataFim) {
    return `http://localhost:2149/consultarhistoricotaxas/execucao-calculo-fechamento?filter=byDataInicioFim&dataInicio=${dataInicio}&dataFim=${dataFim}`;
}

config.getUrlFiltroTaxas = function getUrlFiltroTaxas(idUsina, tipoTaxaId) {
    return `http://localhost:2149/consultarhistoricotaxas/taxa?filter=byUsinaETipoTaxa&idUsina=${idUsina}&tipoTaxa=${tipoTaxaId}`;
}

config.getUrlFiltroFechamentos = function getUrlFiltroFechamentos(idsFechamento) {
    return `http://localhost:2149/consultarhistoricotaxas/fechamentomensal? +
        filter=byIdsAndData&ids=${idsFechamento}&dataInicio=${dataInicio}&dataInicio=${dataFim}`;
}

module.exports = config;