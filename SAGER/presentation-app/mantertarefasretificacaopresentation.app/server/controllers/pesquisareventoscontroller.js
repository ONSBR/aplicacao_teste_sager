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
     * partir de data inicial, data final e usinas
     */
    pesquisarEventos(request, response) {
        let idsUsinas = this.getUsinasIds(request);
        let urlUnidadesGeradorasAPartirUsina = this.getUrlUnidadesGeradorasAPartirUsina(idsUsinas);
        console.log('urlUnidadesGeradorasAPartirUsina=' + urlUnidadesGeradorasAPartirUsina);
        let uges;
        this.domainPromiseHelper.getDomainPromise(urlUnidadesGeradorasAPartirUsina).
            then(ugesPesquisa => {
                uges = ugesPesquisa;
                return this.getEventosPorDataeUGe(request, uges);
            }).
            then(eventos => { this.downloadPlanilhaEventos(request, response, uges, eventos) }).
            catch(e => { console.log(`Erro durante a consulta de eventos: ${e.toString()}`) });
    }

    downloadPlanilhaEventos(request, response, uges, eventos) {
        try {
            let parseFileTemplate =
                parseEventosXlsx.factory(
                    uges, this.getDataInicial(request), this.getDataFinal(request), eventos);

            let contentXlsx = parseFileTemplate.parse();
            response.setHeader('Content-disposition', `attachment; filename=eventos.xlsx`);
            response.setHeader('Content-Length', contentXlsx.length);
            response.write(contentXlsx, 'binary');
            response.end();
        } catch (error) {
            console.log(error);
            response.status(400).send({ error: error.toString() });
        }
    }

    getUrlUnidadesGeradorasAPartirUsina(idsUsinas) {
        return config.getUrlUnidadesGeradorasAPartirUsina(idsUsinas);
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
        return new Date(request.query.dataInicial);
    }

    getDataFinal(request) {
        return new Date(request.query.dataFinal);
    }

    getUsinasIds(request) {
        return request.query.idsUsinas;
    }

}

module.exports = PesquisarEventosController