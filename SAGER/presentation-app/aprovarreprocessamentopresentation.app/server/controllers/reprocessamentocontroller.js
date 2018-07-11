const ReprocessamentoBusiness = require('../business/reprocessamentobusiness');
const dispatcher = require('../dispatcher/dispatcher');

class ReprocessamentoController {

    /**
     * @description Lista todos os reprocessamentos pendentes
     * @param {Request} request 
     * @param {Response} response 
     */
    listarReprocessamentosPendentes(request, response) {
        new ReprocessamentoBusiness().listarReprocessamentosPendentes().then(pendingEvents => {
            response.send(pendingEvents);
        }).catch(error => {
            console.log(error);
            response.status(500).send({ error: error });
        });
    }

    /**
     * Aprova o reprocessamento pendente
     * @param {Request} request 
     * @param {Response} response 
     */
    aprovarReprocessamentoPendente(request, response) {
        let reprocessamentoPendente = request.body;
        new ReprocessamentoBusiness().aprovarReprocessamentoPendente(reprocessamentoPendente).then(result => {
            response.send(result)
        }).catch(error => {
            console.log(error);
            response.status(500).send({ error: error });
        });
    }

}

module.exports = ReprocessamentoController