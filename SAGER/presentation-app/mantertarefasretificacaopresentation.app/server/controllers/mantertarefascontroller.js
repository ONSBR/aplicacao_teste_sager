const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class ManterTarefasController {

    constructor(domainPromiseHelper) {
        if(!domainPromiseHelper) {
            this.domainPromiseHelper = new DomainPromiseHelper();
        } else {
            this.domainPromiseHelper = domainPromiseHelper;
        }
    }

    /**
     * @method cadastrarTarefa
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todas as usinas cadastradas
     */
    cadastrarTarefa(request, response) {
        let tarefa = request.body.tarefa;
        this.domainPromiseHelper.getDomainPromise(config.URL_USINA_SAGER).
            then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante a consulta de usinas: ${e.toString()}`) });
    }

}

module.exports = ManterTarefasController