describe('PesquisarHistoricoTaxasController: ', function () {
    let PesquisarHistoricoTaxasController = require('../controllers/pesquisarhistoricotaxascontroller');
    let config = require('../config');
    let pesquisarHistoricoTaxasController;

    beforeEach(function () {
        pesquisarHistoricoTaxasController = new PesquisarHistoricoTaxasController();
    });

    it('Deve realizar o distinct dos valores de um array', function () {
        let idsFechamentos = [1, 1, 3, 3, 4, 5, 6, 7, 3]
        let idsFechamentosDistinct = pesquisarHistoricoTaxasController.distinct(idsFechamentos);
        expect(idsFechamentosDistinct).toBeDefined();
        expect(idsFechamentosDistinct).toEqual(new Set([1, 3, 4, 5, 6, 7]).values());
    });

    it('Deve extrair os ids de Fechamentos mensais a partir de uma lista de Taxas', function () {
        let taxas = [{ idFechamento: 1 }, { idFechamento: 2 },
        { idFechamento: 3 }, { idFechamento: 4 }, { idFechamento: 1 }];

        let idsFechamentos = pesquisarHistoricoTaxasController.extrairIdsFechamentosDeTaxas(taxas);

        expect(idsFechamentos).toBeDefined();
        expect(idsFechamentos).toEqual([1, 2, 3, 4, 1]);
    });

    it('Deve retornar a url de pesquisa de taxas com os parâmetros configurados.', function () {
        let idsFechamentos = [33, 34]
        let request = {
            body:
                {
                    filtroConsulta: {
                        usina: {
                            idUsina: 1
                        },
                        tipoTaxa: {
                            idTipoTaxa: 2
                        }
                    }
                }
        };
        let urlFiltroTaxas = pesquisarHistoricoTaxasController.getUrlFiltroTaxas(request, idsFechamentos);
        expect(urlFiltroTaxas).toEqual('http://localhost:2100/consultarhistoricotaxas/taxa?filter=byUsinaTipoTaxaIdsFechamentos&idUsina=1&tipoTaxa=2&idsFechamentos=33;34');
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

        let urlFiltroTaxas = pesquisarHistoricoTaxasController.getUrlFiltroFechamentosMensais(request);

        expect(urlFiltroTaxas).toEqual('http://localhost:2100/consultarhistoricotaxas/fechamentomensal?filter=byData&mesInicial=1&anoInicial=2018&mesFinal=12&anoFinal=2018');
    });

    it('Deve retornar a url de pesquisa execuções de calculo a partir dos fechamentos mensais.', function () {
        let idsFechamento = [1, 5, 7];
        let urlFiltroExecucoesCalculo = pesquisarHistoricoTaxasController.getUrlFiltroExecucao(idsFechamento);
        expect(urlFiltroExecucoesCalculo).toEqual('http://localhost:2100/consultarhistoricotaxas/execucaocalculofechamento?filter=byIdsFechamentos&idsFechamentos=1,5,7');
    });

    it('Deve retornar um array com os ids a partir dos fechamentos mensais.', function () {
        let fechamentos = [
            { id: 1 }, { id: 2 }, { id: 3 }, { id: 4, mes: 12, ano: 2018 }, { id: 1 }
        ];
        let idsFechamentos = pesquisarHistoricoTaxasController.extrairIdsFechamentos(fechamentos);

        expect(idsFechamentos).toBeDefined();
        expect(idsFechamentos).toEqual([1, 2, 3, 4, 1]);
    });

    it('Deve retornar a url de consulta de taxas a partir do id do fechamento mensal.', function () {
        let idFechamento = 33;
        let urlFiltroTaxas = pesquisarHistoricoTaxasController.getUrlFiltroTaxasAPartirIdFechamento(idFechamento);
        expect(urlFiltroTaxas).toEqual('http://localhost:2100/consultarhistoricotaxas/taxa?filter=byIdFechamento&idFechamento=33');
    });

    it('Deve retornar a url de consulta de fechamento mensal por id.', function () {
        let idFechamento = 33;
        let urlFiltroTaxas = pesquisarHistoricoTaxasController.getUrlFiltroFechamentoMensalPorId(idFechamento);
        expect(urlFiltroTaxas).toEqual('http://localhost:2100/consultarhistoricotaxas/fechamentomensal?filter=byId&id=33');
    });

    it('Deve retornar os fechamentos.', function () {
        let request = {
            'body':
                { 'filtroConsulta': {} }
        };
        let fechamentos = pesquisarHistoricoTaxasController.pesquisarFechamentos(request);
        expect(fechamentos).toBeDefined();
    });

});