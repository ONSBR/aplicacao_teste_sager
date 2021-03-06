let config = require('../config');

describe('PesquisarHistoricoTaxasController: ', function () {
    let PesquisarHistoricoTaxasController = require('../controllers/pesquisarhistoricotaxascontroller');
    let domainPromiseHelper;
    let pesquisarHistoricoTaxasController;

    beforeEach(function () {
        domainPromiseHelper = {
            getDomainPromise: function(url) {
                return {};
            }
        };
        spyOn(domainPromiseHelper, 'getDomainPromise');
        pesquisarHistoricoTaxasController = new PesquisarHistoricoTaxasController(domainPromiseHelper);
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
        var expectUrl = `http://localhost:${config.DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byUsinaTipoTaxaIdsFechamentos&idUsina=1&tipoTaxa=2&idsFechamentos=33;34`;
        expect(urlFiltroTaxas).toEqual(expectUrl);
    });

    it('Deve retornar a url de pesquisa de fechamentos mensais.', function () {
        let urlFiltroTaxas = pesquisarHistoricoTaxasController.getUrlFiltroFechamentosMensais();
        expect(urlFiltroTaxas).toEqual(`http://localhost:${config.DOMAIN_PORT}/consultarhistoricotaxas/fechamentomensal`);
    });

    it('Deve retornar a url de pesquisa execuções de calculo a partir dos fechamentos mensais.', function () {
        let idsFechamento = [1, 5, 7];
        let urlFiltroExecucoesCalculo = pesquisarHistoricoTaxasController.getUrlFiltroExecucao(idsFechamento);
        expect(urlFiltroExecucoesCalculo).toEqual(`http://localhost:${config.DOMAIN_PORT}/consultarhistoricotaxas/execucaocalculofechamento?filter=byIdsFechamentos&idsFechamentos=1,5,7`);
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
        expect(urlFiltroTaxas).toEqual(`http://localhost:${config.DOMAIN_PORT}/consultarhistoricotaxas/taxa?filter=byIdFechamento&idFechamento=33`);
    });

    it('Deve retornar a url de consulta de fechamento mensal por id.', function () {
        let idFechamento = 33;
        let urlFiltroTaxas = pesquisarHistoricoTaxasController.getUrlFiltroFechamentoMensalPorId(idFechamento);
        expect(urlFiltroTaxas).toEqual(`http://localhost:${config.DOMAIN_PORT}/consultarhistoricotaxas/fechamentomensal?filter=byId&id=33`);
    });

    it('Deve retornar as execuções.', function () {
        let taxas = [{'idFechamento': 1}, {'idFechamento': 2}, {'idFechamento': 3}];
        let execucoes = pesquisarHistoricoTaxasController.pesquisarExecucoesCalculo(taxas);
        var expectUrl = `http://localhost:${config.DOMAIN_PORT}/consultarhistoricotaxas/execucaocalculofechamento?filter=byIdsFechamentos&idsFechamentos=1;2;3`;
        
        expect(domainPromiseHelper.getDomainPromise).toHaveBeenCalledWith(expectUrl);
    });

});