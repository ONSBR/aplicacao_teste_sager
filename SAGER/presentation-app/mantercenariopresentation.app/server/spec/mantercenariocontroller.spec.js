describe('ManterCenarioController: ', function () {

    let ManterCenarioController = require('../controllers/mantercenariocontroller');
    let config = require('../config');
    let manterCenarioController;
    let request;
    let response;
    let result;
    let domainpromisefakeparam;
    let domainpromisefake;

    beforeEach(function () {
        
        result = { };
        result.setValueParam = function (url, data, retorno) {
            result[url + JSON.stringify(data)] = retorno;
        };
        result.getValueParam = function (url, data) {
            return result[url + JSON.stringify(data)];
        };

        domainpromisefakeparam = function (url, data) {
            return { then: (func) => { func(result.getValueParam(url, data)); return domainpromisefake; } };
        };

        domainpromisefake = function () {
            return { then: (func) => { func(result); return domainpromisefake; } };
        };

        domainpromisefakeparam.catch = function(fnError) {};
        domainpromisefake.catch = function(fnError) {};

        domainPromiseHelper = { };
        domainPromiseHelper.setPromise = function(domainpromise) {
            domainPromiseHelper.getDomainPromise = domainpromise;
            domainPromiseHelper.postDomainPromise = domainpromise;
        }
        domainPromiseHelper.setPromise(domainpromisefake);

        response = {
            send: function(data) {this.data = data}
        };

        request = {};
        manterCenarioController = new ManterCenarioController();
        manterCenarioController.domainPromiseHelper = domainPromiseHelper;
    });
    
    it('Pesquisar cenários.', () => {
        
        var filtroNome = 'filtroNome';
        var filtroDataInicial = Date.now;
        var filtroDataFinal = Date.now;
        var filtroAtivo = true;
        
        result = "teste";

        request.body = { 
            filtroNome: filtroNome, 
            filtroDataInicial: filtroDataInicial,
            filtroDataFinal: filtroDataFinal,
            filtroAtivo: filtroAtivo
        };
        manterCenarioController.pesquisarCenarios(request, response);
        
        expect(response.data).toEqual(result);
    });

    it('Listar usinas.', () => {
        
        result = "teste";        

        manterCenarioController.listarUsinas(request, response);

        expect(response.data).toEqual(result);
        
    });

    it('Listar unidades geradoras.', () => {
        
        result = "teste";

        request.query = { idUsina: "1" };
        manterCenarioController.listarUnidadesGeradoras(request, response);

        expect(response.data).toEqual(result);
        
    });

    it('Obter regras críticas.', () => {
        
        result = "teste";

        request.query = { idCenario: "1" };
        manterCenarioController.obterRegrasCriticas(request, response);

        expect(response.data).toEqual(result);
        
    });

    it('Alterar Cenário.', () => {
        
        request.body = { id: "1" };

        manterCenarioController.cenarioBusiness = {};
        manterCenarioController.cenarioBusiness.alterarCenario = function(cenario) {
            result = request.body;
            return domainpromisefake();
        };
        manterCenarioController.alterarCenario(request, response);

        expect(response.data).toEqual(result);
        
    });

    it('Inserir Cenário.', () => {
        
        request.body = { id: "1" };

        manterCenarioController.cenarioBusiness = {};
        manterCenarioController.cenarioBusiness.inserirCenario = function(cenario) {
            result = request.body;
            return domainpromisefake();
        };
        manterCenarioController.inserirCenario(request, response);

        expect(response.data).toEqual(result);
        
    });

    it('Excluir Cenário.', () => {
        
        request.query = { idCenario: "1" };

        manterCenarioController.cenarioBusiness = {};
        manterCenarioController.cenarioBusiness.excluirCenario = function(cenario) {
            result = request.query;
            return domainpromisefake();
        };
        manterCenarioController.excluirCenario(request, response);

        expect(response.data).toEqual(result);
        
    });

    it('Ativar e Inativar Cenário.', () => {
        
        request.body= { idCenario: "1" };

        manterCenarioController.cenarioBusiness = {};
        manterCenarioController.cenarioBusiness.ativarInativarCenario = function(cenario) {
            result = request.body;
            return domainpromisefake();
        };
        manterCenarioController.ativarInativarCenario(request, response);

        expect(response.data).toEqual(result);
        
    });

});