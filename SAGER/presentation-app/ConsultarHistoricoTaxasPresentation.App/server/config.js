var config = {};

config.PORT = 8181;
config.urlUsinaSAGER = 'http://localhost:2114/listar-usinas/usina';

config.getUrlFiltroExecucao = function getUrlFiltroExecucao(dataInicio, dataFim) {
    return `http://localhost:2114/consultar-historico-taxas/execucao-calculo-fechamento?filter=byDataInicioFim&dataInicio=${dataInicio}&dataFim=${dataFim}`;
}

module.exports = config;