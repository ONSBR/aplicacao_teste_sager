const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class ListarTarefasController {

    constructor(domainPromiseHelper) {
        if(!domainPromiseHelper) {
            this.domainPromiseHelper = new DomainPromiseHelper();
        } else {
            this.domainPromiseHelper = domainPromiseHelper;
        }
    }

    /**
     * @method listarTarefas
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todas as tarefas de retificação cadastradas
     */
    listarTarefas(request, response) {
        this.domainPromiseHelper.getDomainPromise(config.URL_TAREFAS).
            then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante a consulta de usinas: ${e.toString()}`) });
    }

}

module.exports = ListarTarefasController