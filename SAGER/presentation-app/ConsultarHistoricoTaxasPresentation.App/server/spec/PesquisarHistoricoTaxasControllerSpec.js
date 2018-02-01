describe('Pesquisar historico de execuções e taxas', function () {
    let PesquisarHistoricoTaxasController = require('../controllers/PesquisarHistoricoTaxasController');
    let pesquisarHistoricoTaxasController;

    beforeEach(function() {
        pesquisarHistoricoTaxasController = new PesquisarHistoricoTaxasController();
    });

    it('Deve realizar a pesquisa de taxas', function (done) {
        let taxasPromise = pesquisarHistoricoTaxasController.pesquisarTaxas();
        expect(taxasPromise).toBeDefined();
        done();
    });
});