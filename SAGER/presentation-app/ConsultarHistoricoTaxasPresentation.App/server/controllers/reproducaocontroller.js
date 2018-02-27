const config = require('../config');
const Enumerable = require('linq');
//const parsexlsx = require('./parse/parsexlsx');
const reproducaoBusiness = require('../business/reproducaobusiness');
const Lookup = require('plataforma-sdk/ioc/lookup');

/**
 * @class ReproducaoController
 * @description Controlador das requisições relacionadas a reprodução do cálculo de taxas.
 */
class ReproducaoController {

    constructor() {
        //this.eventManager = new Lookup().eventManager;
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
            name: "system.event.reproduction.request", 
            payload: { instance_id: request.body.instance_id }, 
            owner: request.body.presentationId 
        };

        this.eventManager.emit(evento).then(res => {response.send(res)});
    }

    /**
     * @description Faz download de dados da comparação das memórias reproduzidas.
     * @param {*} request 
     * @param {*} response 
     */
    downloadComparacaoReproducao(request, response) {
        
        var reproduction_id = request.body.reproduction_id;
        var taxa_id = request.body.taxa_id;

        var reproduction;
        
        var processInstanceOriginalId = reproduction;
        var processInstanceReproductedId = reproduction.processInstanceReproductedId;

        var processInstanceOriginal = new Promise();
        var processInstanceReproducted = new Promise();

        Promise.all(processInstance, processInstanceReproducted).then(results => {
            
            var contextOriginal = results[0];
            var contextReproducted = results[1];

            var resultadoComparacao = reproducaoBusiness.compararMemoriaCalculoTaxa(contextOriginal, contextReproducted);

        }).catch(error => {
            // TODO tratamento de erro
        });
    }
}

module.exports = ReproducaoController;