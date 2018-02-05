const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class ListarTipoTaxaController {

    constructor(domainPromiseHelper) {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    /**
     * @method listarTipoTaxa
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todos os tipos de taxa
     */
    listarTipoTaxa(request, response) {
        this.domainPromiseHelper.getDomainPromise(config.URL_TIPO_TAXA_SAGER).
            then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante a consulta de tipos de taxa: ${e.toString()}`) });
    }

}

module.exports = ListarTipoTaxaController