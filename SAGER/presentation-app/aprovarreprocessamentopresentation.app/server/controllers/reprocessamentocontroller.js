class ReprocessamentoController{

    /**
     * @description Lista todos os reprocessamentos pendentes
     * @param {Request} request 
     * @param {Response} response 
     */
    listarReprocessamentosPendentes(request, response) {
        let eventosPendentes = [{teste:1}];
        response.send(eventosPendentes);
    }


}

module.exports = ReprocessamentoController