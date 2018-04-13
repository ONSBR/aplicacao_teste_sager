const config = require('../config');
const Enumerable = require('linq');
const reproducaoBusiness = require('../business/reproducaobusiness');
const Lookup = require('plataforma-sdk/ioc/lookup');
const EventPromiseHelper = require('../helpers/eventpromisehelper');
const ReproducaoBusiness = require('../business/reproducaobusiness');
const parsexlsx = require('../controllers/parse/parsereproducaoxlsx');

/**
 * @class ReproducaoController
 * @description Controlador das requisições relacionadas a reprodução do cálculo de taxas.
 */
class ReproducaoController {

    constructor() {
        //this.eventManager = new Lookup().eventManager;
        this.eventPromiseHelper = new EventPromiseHelper();
        this.reproducaoBusiness = new ReproducaoBusiness();
    }

    /**
     * @description Envia o evento de solicitação de reprodução para a plataforma.
     * @param {*} request 
     * @param {*} response 
     *
     * @argument {string} instance_id identificador da instância do processo que gerou a taxa
     */
    reproduzirCalculoTaxa(request, response) {

        var evento = {
            name: "system.events.reproduction.request",
            reproduction: {
                instanceId: request.body.instance_id,
                owner: request.body.presentationId,
                externalId: request.body.taxa_id
            }
        };

        console.log("evento: " + JSON.stringify(evento));

        //this.eventManager.emit(evento).then(res => {response.send(res)});
        return this.eventPromiseHelper.putEventPromise(evento).then(res => { response.send(res) });
    }

    /**
     * @description Faz download de dados da comparação das memórias reproduzidas.
     * @param {*} request 
     * @param {*} response 
     */
    downloadComparacaoReproducaoXlsx(request, response) {

        var instance_id = request.query.instance_id;
        var original_id = request.query.original_id;
        var taxa_id = request.query.taxa_id;

        this.reproducaoBusiness.compararMemoriasReproducao(original_id, instance_id, taxa_id).
            then(resultado => {
                try {
                    var parseFileTemplate = parsexlsx.factory(resultado);
                    var contentXlsx = parseFileTemplate.parse();

                    response.setHeader('Content-disposition',
                        'attachment; filename=resultadoreproducao_' +
                        original_id + '.xlsx');
                    response.setHeader('Content-Length', contentXlsx.length);
                    response.write(contentXlsx, 'binary');
                    response.end();
                }
                catch (error) {
                    console.log(error);
                    response.send(400);
                }
            }).catch(e => { console.log(`Erro durante a consulta da memória de processamento: ${e.toString()}`) });
    }

    listarReproducoes(request, response) {

        this.reproducaoBusiness.listarReproducoes().then(res => { response.send(res) });
    }
}

module.exports = ReproducaoController;