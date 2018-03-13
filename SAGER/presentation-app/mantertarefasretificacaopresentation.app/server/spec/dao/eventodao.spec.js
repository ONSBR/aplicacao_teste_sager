const EventoDAO = require('../../dao/eventodao');

describe('EventoDAO deve:', function () {
    let eventoDAO

    beforeEach(function() {
        eventoDAO = new EventoDAO();
      });

    it('Retornar a url de uges:', () => {
        let urlUge = eventoDAO.getUrlUnidadesGeradorasAPartirUsina(1);
        expect(urlUge).toBe('http://localhost:2117/mantertarefas/unidadegeradora?filter=byIdUsina&idsUsinas=1');
    });

    it('Retornar uma promise com as uges:', (done) => {
        let promiseUge = new Promise((resolve, reject) => {
            resolve([{id: '1'}]);
        });
        eventoDAO.domainPromiseHelper.getDomainPromise = 
            spyOn(eventoDAO.domainPromiseHelper, 'getDomainPromise').and.returnValue(promiseUge);
        let promiseUGE = eventoDAO.pesquisarUGEs(1);
        promiseUGE.then(uges => {
            expect(uges[0].id).toBe('1');
            done();
        }).catch(error => {
            console.log('Test Error:' + error)
            expect(false).toBeTruthy();
            done();
        });
    });

    it('Retornar a url de filtro de eventos:', () => {
        let urlFiltroEventos = eventoDAO.getUrlFiltroEventoPorDataseUGes('1', '2017-01-01', '2017-12-31');
        expect(urlFiltroEventos).toBe('http://localhost:2117/mantertarefas/eventomudancaestadooperativo?filter=byIntervaloDatas&dataInicial=2017-01-01&dataFinal=2017-12-31=&idsUges=1');
    });

    it('Retornar uma promise com os eventos:', (done) => {
        let promiseEvento = new Promise((resolve, reject) => {
            resolve([{id: '1'}]);
        });
        eventoDAO.domainPromiseHelper.getDomainPromise = 
            spyOn(eventoDAO.domainPromiseHelper, 'getDomainPromise').and.returnValue(promiseEvento);
        let promiseEventos = eventoDAO.getEventosPorDataeUGe('1', '2017-01-01', '2017-12-31');
        promiseEventos.then(uges => {
            expect(uges[0].id).toBe('1');
            done();
        }).catch(error => {
            console.log('Test Error:' + error)
            expect(false).toBeTruthy();
            done();
        });
    });

});



