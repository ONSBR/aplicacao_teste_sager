const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class PesquisarEventosController {

    constructor(domainPromiseHelper) {
        if (!domainPromiseHelper) {
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
        let usinaId = this.getUsinaId(request);
        this.domainPromiseHelper.getDomainPromise(
            this.getUrlUnidadesGeradorasAPartirUsina(usinaId)).
            then(uges => { return this.getEventosPorDataeUGe(request, uges) }).
            then(eventos => { console.log(eventos) }).
            catch(e => { console.log(`Erro durante a consulta de usinas: ${e.toString()}`) });
    }

    getUrlUnidadesGeradorasAPartirUsina(idUsina) {
        return config.getUrlUnidadesGeradorasAPartirUsina(idUsina);
    }

    getEventosPorDataeUGE(request, uges) {
        let idsUGes = this.extrairIdsUges(uges).join(';');
        let dataInicial = this.getDataInicial(request);
        let dataFinal = this.getDataFinal(request);

        let urlFiltroEventos = this.urlFiltroEventoPorDataseUGes(idsUGes, dataInicial, dataFinal);

        return this.domainPromiseHelper.getDomainPromise(urlFiltroEventos);
    }

    urlFiltroEventoPorDataseUGes(idsUGes, dataInicial, dataFinal) {

    }

    extrairIdsUges(uges) {
        return uges.map(uge => uge.id);
    }

    getDataInicial(request) {
        return new Date(request.body.filtroEvento.dataInicial);
    }

    getDataFinal(request) {
        return new Date(request.body.filtroEvento.dataFinal);
    }

    getUsinaId(request) {
        return request.body.filtroEvento.usina.idUsina;
    }

}

module.exports = PesquisarEventosController