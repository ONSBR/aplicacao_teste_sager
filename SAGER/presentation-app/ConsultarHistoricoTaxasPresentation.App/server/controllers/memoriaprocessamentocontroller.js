const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class MemoriaProcessamentoController {

    constructor(domainPromiseHelper) {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    /**
     * @method getMemoriaDeProcessamento
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Recupera a memória de processamento .
     */
    getMemoriaDeProcessamento(request, response) {
        let processInstanceId = request.body.id;
        let processMemoryUrl = config.getProcessMemoryUrl(processInstanceId);
        console.log('processMemoryUrl: ' + processMemoryUrl);
        this.domainPromiseHelper.getDomainPromise(processMemoryUrl).
            then(data => { response.send(data);}).
            catch(e => { console.log(`Erro durante a consulta da memória de processamento: ${e.toString()}`) });
    }

}

module.exports = MemoriaProcessamentoController