var config = {};

config.PORT = process.env.PORT || 8181;
config.URL_PENDING_EVENTS = 'http://maestro:6971/v1.0.0/reprocessing/ec498841-59e5-47fd-8075-136d79155705/pending';

config.getUrlAprovarReprocessamentoPendente = function getUrlAprovarReprocessamentoPendente(idReprocessamento) {
    return `http://maestro:6971/v1.0.0/reprocessing/${idReprocessamento}/approve`;
}

module.exports = config;