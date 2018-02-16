describe('ListarUsinasController: ', function () {
    let ListarUsinasController = require('../controllers/listarusinascontroller');
    let config = require('../config');
    let domainPromiseHelper;
    let listarUsinasController;
    let request;
    let response;

    beforeEach(function () {
        domainPromiseHelper = {
            getDomainPromise: function (url) {
                return new Promise((resolve, reject) => { resolve({ id: '1' }) });
            }
        };
        response = {
            responseData: {},
            send: function(data) {
                responseData = data;                    
            }
        };

        request = {};
    });
    
    it('Deve retornar as usinas.', function (done) {
        listarUsinasController = new ListarUsinasController(domainPromiseHelper);
        listarUsinasController.listarUsinas(request, response);

        expect(response.responseData).toBeDefined();
        done();
    });

});