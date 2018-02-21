const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const parseEventosXlsx = require('./parse/parseeventosxlsx');

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
        let urlUnidadesGeradorasAPartirUsina = this.getUrlUnidadesGeradorasAPartirUsina(usinaId);
        let filtroEventos = request.body.filtroEvento;
        console.log('urlUnidadesGeradorasAPartirUsina=' + urlUnidadesGeradorasAPartirUsina);
        this.domainPromiseHelper.getDomainPromise(urlUnidadesGeradorasAPartirUsina).
            then(uges => { return this.getEventosPorDataeUGe(request, uges) }).
            then(eventos => { this.downloadPlanilhaEventos(response, filtroEventos, eventos) }).
            catch(e => { console.log(`Erro durante a consulta de eventos: ${e.toString()}`) });
    }

    downloadPlanilhaEventos(response, filtroEventos, eventos) {
        try {
            var parseFileTemplate = parseEventosXlsx.factory(filtroEventos, eventos);
            var contentXlsx = parseFileTemplate.parse();
            response.setHeader('Content-disposition', `attachment; filename=eventos.xlsx`);
            response.setHeader('Content-Length', contentXlsx.length);
            response.write(contentXlsx, 'binary');
            response.end();
        }
        catch (error) {
            console.log(error);
            response.sendStatus(400);
        }
    }

    getUrlUnidadesGeradorasAPartirUsina(idUsina) {
        return config.getUrlUnidadesGeradorasAPartirUsina(idUsina);
    }

    getEventosPorDataeUGe(request, uges) {
        let idsUGes = this.extrairIdsUges(uges).join(';');
        let dataInicial = this.getDataInicial(request).toISOString().slice(0, 10);
        let dataFinal = this.getDataFinal(request).toISOString().slice(0, 10);

        let urlFiltroEventos = this.getUrlFiltroEventoPorDataseUGes(idsUGes, dataInicial, dataFinal);
        console.log('urlFiltroEventos=' + urlFiltroEventos);
        return this.domainPromiseHelper.getDomainPromise(urlFiltroEventos);
    }

    getUrlFiltroEventoPorDataseUGes(idsUGes, dataInicial, dataFinal) {
        return config.getUrlFiltroEventoPorDataseUGes(idsUGes, dataInicial, dataFinal);
    }

    extrairIdsUges(uges) {
        return uges.map(uge => uge.idUge);
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