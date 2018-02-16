describe('ListarTipoTaxaController: ', function () {
    let ListarTipoTaxaController = require('../controllers/listartipotaxacontroller');
    let config = require('../config');
    let domainPromiseHelper;
    let listarTipoTaxaController;
    let request;
    let response;

    beforeEach(function () {
        domainPromiseHelper = {
            getDomainPromise: function (url) {
                return new Promise((resolve, reject) => { resolve({ id: '123' }) });
            }
        };
        response = {
            send: function(data) {}
        };

        spyOn(response, 'send');
        request = {};
        listarTipoTaxaController = new ListarTipoTaxaController(domainPromiseHelper);
        listarTipoTaxaController.listarTipoTaxa(request, response);
    });
    
    it('Deve retornar os tipos de taxa.', function (done) {
        expect(response.send).toHaveBeenCalled();
        done();
    });

    it('O helper deve estar configurado mesmo sem a passagem no construtor.', function () {
        listarTipoTaxaController = new ListarTipoTaxaController();
        expect(listarTipoTaxaController.domainPromiseHelper).toBeDefined();
    });
});