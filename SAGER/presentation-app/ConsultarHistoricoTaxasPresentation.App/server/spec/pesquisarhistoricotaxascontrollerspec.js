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
        let idsFechamentos = [1, 1, 3, 3, 4, 5, 6, 7, 3]
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

    it('Deve retornar a url de pesquisa de taxas com os parâmetros configurados.', function () {
        let request = {
            body:
                {
                    filtroConsulta: {
                        usina: {
                            id: 1
                        },
                        tipoTaxa: {
                            id: 2
                        }
                    }
                }
        };
        let urlFiltroTaxas = pesquisarHistoricoTaxasController.getUrlFiltroTaxas(request);

        expect(urlFiltroTaxas).toEqual('http://localhost:2171/consultarhistoricotaxas/taxa?filter=byUsinaETipoTaxa&idUsina=1&tipoTaxa=2');
    });

    it('Deve retornar a url de pesquisa de fechamentos mensais com os parâmetros configurados.', function () {
        let request = {
            body:
                {
                    filtroConsulta: {
                        dataInicial: '2018-01-01',
                        dataFinal: '2018-12-31'
                    }
                }
        };

        let taxas = [{ idFechamento: 324 }, { idFechamento: 123 }];
        let urlFiltroTaxas = pesquisarHistoricoTaxasController.getUrlFiltroFechamentosMensais(request, taxas);

        expect(urlFiltroTaxas).toEqual('http://localhost:2171/consultarhistoricotaxas/fechamento-mensal?filter=byIdsAndData' +
            '&mesInicial=1&anoInicial=2018&mesFinal=12&anoFinal=2018&ids=324;123');
    });
});