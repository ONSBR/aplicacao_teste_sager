const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class PesquisarEventosController {

    constructor(domainPromiseHelper) {
        if(!domainPromiseHelper) {
            this.domainPromiseHelper = new DomainPromiseHelper();
        } else {
            this.domainPromiseHelper = domainPromiseHelper;
        }
    }

    /**
     * @method pesquisarEventos
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Pesquisa todos os eventos de mudança de estado operativo a 
     * partir de data inicial, data final e usina
     */
    pesquisarEventos(request, response) {
        this.domainPromiseHelper.getDomainPromise(config.URL_USINA_SAGER).
            then(data => { console.log(data) }).
            catch(e => { console.log(`Erro durante a consulta de usinas: ${e.toString()}`) });
    }

    getUrlUnidadesGeradorasAPartirUsina(idUsina) {
        return config.getUrlUnidadesGeradorasAPartirUsina(idUsina);
    }

}

module.exports = ListarUsinasController