const config = require('../config');
const EventoMediator = require('../business/eventomediator');

class PesquisarEventosController {

    constructor() {
        this.eventoMediator = new EventoMediator();
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
        let dataInicial = this.getDataInicial(request);
        let dataFinal = this.getDataFinal(request);
        this.eventoMediator.pesquisarEventos(idsUsinas, dataInicial, dataFinal).
            then(contentXlsx => { this.downloadPlanilhaEventos(response, contentXlsx) }).
            catch(e => { console.log(`Erro durante a consulta de eventos: ${e.toString()}`) });
    }

    downloadPlanilhaEventos(response, contentXlsx) {
        try {
            response.setHeader('Content-disposition', `attachment; filename=eventos.xlsx`);
            response.setHeader('Content-Length', contentXlsx.length);
            response.write(contentXlsx, 'binary');
            response.end();
        } catch (error) {
            console.log(error);
            response.status(400).send({ error: error.toString() });
        }
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