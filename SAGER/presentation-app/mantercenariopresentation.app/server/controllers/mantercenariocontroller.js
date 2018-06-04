const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const CenarioBusiness = require('../business/cenariobusiness');
const dispatcher = require("../dispatcher/dispatcher");

class ManterCenarioController {

    constructor() {
        this.domainPromiseHelper = new DomainPromiseHelper();
        this.cenarioBusiness = new CenarioBusiness();
    }

    /**
     * @method pesquisarCenarios
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Pesquisa os cenáios cadastrados no sistema
     */
    pesquisarCenarios(request, response) {
        
        let filtroNome = request.body.nome;
        let filtroDataInicial;
        let filtroDataFinal;
        if(request.body.dataInicial) {
            filtroDataInicial = new Date(request.body.dataInicial).toISOString().slice(0, 10);
        }        
        if(request.body.dataFinal) {
            filtroDataFinal = new Date(request.body.dataFinal).toISOString().slice(0, 10);    
        }
        let filtroAtivo = request.body.ativo;
        let url = config.getUrlFiltroCenario(filtroNome, filtroDataInicial, filtroDataFinal);
        
        this.domainPromiseHelper.getDomainPromise(url).
            then(data => { response.send(data); }).
            catch(e => { console.log(`Erro durante a consulta de cenários: ${e.toString()}`) });
    }

    /**
     * @method listarUsinas
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todas as usinas cadastradas
     */
    listarUsinas(request, response) {
        this.domainPromiseHelper.getDomainPromise(config.URL_USINA_SAGER).
            then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante a consulta de usinas: ${e.toString()}`) });
    }

    /**
     * @method listarUnidadesGeradoras
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista as unidades geradoras da usina informada
     */
    listarUnidadesGeradoras(request, response) {

        var idUsina = request.query.idUsina;
        var url = config.getUrlFiltroUnidadeGeradora(idUsina);

        this.domainPromiseHelper.getDomainPromise(url).
            then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante a consulta de uges: ${e.toString()}`) });
    }

    /**
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista as regras críticas do cenário informada
     */
    obterRegrasCriticas(request, response) {

        var idCenario = request.query.idCenario;
        var url = config.getUrlFiltroRegrasPorIdCenario(idCenario);

        this.domainPromiseHelper.getDomainPromise(url).
            then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante a consulta de regras: ${e.toString()}`) });
    }

    /**
     * @description Altera os dados de um cenário informado
     * @param {Request} request 
     * @param {Response} response 
     */
    alterarCenario(request, response) {
        var cenario = request.body;
        dispatcher.dispatch("presentation.atualiza.cenario.request", { cenario: cenario, idCenario: cenario.idCenario }).then(result => { response.send(result) });
    }

    /**
     * @description Insere o cenário informado
     * @param {Request} request 
     * @param {Response} response 
     */
    inserirCenario(request, response) {
        let cenario = request.body;
        dispatcher.dispatch("presentation.insere.cenario.request", { cenario: cenario }).then(result => { response.send(result) });
    }

    /**
     * @description Exclui um cenário informado
     * @param {Request} request 
     * @param {Response} response 
     */
    excluirCenario(request, response) {
        dispatcher.dispatch("presentation.exclui.cenario.request",
            { idCenario: request.query.idCenario }).then(dispatcherResult => { response.send(dispatcherResult) });
    }

    /**
     * @description Ativa ou inativa um cenário.
     * @param {Request} request 
     * @param {Response} response 
     */
    ativarInativarCenario(request, response) {
        dispatcher.dispatch("presentation.ativarinativarcenario.cenario.request", { idCenario: request.body.idCenario }).then(result => { response.send(result) });
    }
}

module.exports = ManterCenarioController;