describe('Pesquisar historico de execuções e taxas', function () {
    let PesquisarHistoricoTaxasController = require('../controllers/pesquisarhistoricotaxascontroller');
    let pesquisarHistoricoTaxasController;

    beforeEach(function () {
        pesquisarHistoricoTaxasController = new PesquisarHistoricoTaxasController();
    });

    it('Deve realizar a pesquisa de taxas', function (done) {
        let taxasPromise = pesquisarHistoricoTaxasController.pesquisarTaxas();
        expect(taxasPromise).toBeDefined();
        done();
    });

    it('Deve realizar o distinct dos valores de um array', function () {
        let idsFechamentos = [1, 1, 3, 4, 5, 6, 7, 3]
        let idsFechamentosDistinct = pesquisarHistoricoTaxasController.distinct(idsFechamentos);
        expect(idsFechamentosDistinct).toBeDefined();
        expect(idsFechamentosDistinct).toEqual(new Set([1, 3, 4, 5, 6, 7]));
    });

    it('Deve extrair os ids de Fechamentos mensais a partir de uma lista de Taxas', function () {
        let taxas = [{ idFechamento: 1 }, { idFechamento: 2 },
            { idFechamento: 3 }, { idFechamento: 4 }, { idFechamento: 1 }];
        
        let idsFechamentos = pesquisarHistoricoTaxasController.extractIdsFechamentosMensaisFromTaxas(taxas);

        expect(idsFechamentos).toBeDefined();
        expect(idsFechamentos).toEqual([1, 2, 3, 4, 1]);
    });
});