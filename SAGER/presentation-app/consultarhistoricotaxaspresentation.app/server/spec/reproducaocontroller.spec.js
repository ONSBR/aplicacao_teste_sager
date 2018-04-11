describe('ReproducaoController: ', function () {
    let ReproducaoController = require('../controllers/reproducaocontroller');
    let config = require('../config');
    let eventPromiseHelper;
    let reproducaoController;
    let request;
    let response;

    beforeEach(function () {
        
        eventPromiseHelper = {
            putEventPromise: function (data) {
                return { then: (func) => { func(data) } };
            }
        };
        response = {
            send: function(data) {this.data = data}
        };

        request = {};
        reproducaoController = new ReproducaoController();
        reproducaoController.eventPromiseHelper = eventPromiseHelper;
    });
    
    it('Envio de evento de reprodução.', () => {
        
        var instance_id = "instance_id";
        var taxa_id = "taxa_id";
        
        request.body = { instance_id: instance_id, taxa_id: taxa_id};
        reproducaoController.reproduzirCalculoTaxa(request, response);
        
        expect(response.data.reproduction.instanceId).toEqual(instance_id);
        expect(response.data.reproduction.externalId).toEqual(taxa_id);
    });

    it('Listar reproduções.', () => {
        
        var data = ["data"];

        reproducaoController.reproducaoBusiness = {
            listarReproducoes: function () {
                return { then: (func) => { func(data) } };
            }
        };

        reproducaoController.listarReproducoes(request, response);

        expect(response.data).toEqual(data);
    });

    it('Download resultado reprodução.', () => {
        
        var instance_id = "instance_id";
        var original_id = "original_id";
        var taxa_id = "taxa_id";

        request.query = { instance_id: instance_id, original_id, taxa_id: taxa_id};

        var data = "data";

        spyOn(require('../controllers/parse/parsereproducaoxlsx'), 'factory').and.callFake(() => { return { parse: () => {
            return data;
        } } });

        response.setHeader = function (key, value) { 
            if (!this.headers) this.headers = [];
            this.headers[key] = value; 
        };

        response.write = function(contentXlsx, type) { 
            this.data = contentXlsx; 
            this.typeContent = type;
        };

        response.end = () => {}; 

        reproducaoController.reproducaoBusiness = {
            compararMemoriasReproducao: function () {
                return { then: (func) => { func(data); return { catch: (fcatch) => { fcatch(new Error()) } } } };
            }
        };

        reproducaoController.downloadComparacaoReproducaoXlsx(request, response);

        expect(response.data).toEqual(data);
        expect(response.typeContent).toEqual('binary');

        expect(response.headers['Content-disposition']).toEqual('attachment; filename=resultadoreproducao_' + 
            original_id + '.xlsx');

        expect(response.headers['Content-Length']).toEqual(data.length);
    });

});