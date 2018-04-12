const PesquisarHistoricoTaxasController = require('../controllers/pesquisarhistoricotaxascontroller');
let config = require('../config');

describe('PesquisarHistoricoTaxasController: ', function () {
    
    it('Filtrar fechamentos por data:', function () {
        let pesquisarHistoricoTaxasController = new PesquisarHistoricoTaxasController();
        let request = {
            body:
                {
                    filtroConsulta: {
                        mesInicial: '6',
                        anoInicial: '2017',
                        mesFinal: '1',
                        anoFinal: '2018'
                    }
                }
        };
        let fechamentos = [
            {ano:2014, mes:1},
            {ano:2014, mes:2},
            {ano:2014, mes:3},
            {ano:2017, mes:5},
            {ano:2017, mes:6},
            {ano:2017, mes:7},
            {ano:2017, mes:8},
            {ano:2017, mes:9},
            {ano:2017, mes:10},
            {ano:2017, mes:11},
            {ano:2017, mes:12},
            {ano:2018, mes:1},
            {ano:2018, mes:2},
            {ano:2018, mes:3}
        ];     
       
        let fechamentosFiltrados = pesquisarHistoricoTaxasController.filtrarFechamentos(request, fechamentos);
        expect(fechamentosFiltrados.length).toBe(8);
        
    });
});