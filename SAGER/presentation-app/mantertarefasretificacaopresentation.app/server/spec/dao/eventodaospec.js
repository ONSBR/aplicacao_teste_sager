const EventoDAO = require('../../dao/eventodao');

describe('EventoDAO deve:', function () {

    it('Retornar a url de uges:', () => {
        let eventoDAO = new EventoDAO();
        let urlUge = eventoDAO.getUrlUnidadesGeradorasAPartirUsina(1);
        expect(urlUge).toBe('http://localhost:2117/mantertarefas/unidadegeradora?filter=byIdUsina&idsUsinas=1');
    });

    it('Retornar uma promise com as uges:', () => {
        let eventoDAO = new EventoDAO();
        let promiseUGE = eventoDAO.pesquisarUGEs(1);
        expect(promiseUGE).toBeDefined();
    });

    it('Retornar a url de filtro de eventos:', () => {
        let eventoDAO = new EventoDAO();
        let urlFiltroEventos = eventoDAO.getUrlFiltroEventoPorDataseUGes('1', '2017-01-01', '2017-12-31');
        expect(urlFiltroEventos).toBe('http://localhost:2117/mantertarefas/eventomudancaestadooperativo?filter=byIntervaloDatas&dataInicial=2017-01-01&dataFinal=2017-12-31=&idsUges=1');
    });

    it('Retornar uma promise com os eventos:', () => {
        let eventoDAO = new EventoDAO();
        let promiseEventos = eventoDAO.getEventosPorDataeUGe('1', '2017-01-01', '2017-12-31');
        expect(promiseEventos).toBeDefined();
    });

});



