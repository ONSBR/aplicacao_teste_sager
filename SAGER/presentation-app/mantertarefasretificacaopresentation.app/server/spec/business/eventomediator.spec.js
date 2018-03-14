const EventoMediator = require('../../business/eventomediator');

describe('EventoMediator deve:', function () {

    let eventoMediator;

    beforeEach(function () {
        eventoMediator = new EventoMediator();
        let promiseUge = new Promise((resolve) => {
            resolve([{idUge: 'ALUXG-1'}, {idUge: 'ALUXG-2'}]);
        });
        let promiseEventos = new Promise((resolve) => {
            resolve([{id: '1'}, {id: '2'}]);
        });
        spyOn(eventoMediator.eventoDAO, 'pesquisarUGEs').and.returnValue(promiseUge);
        spyOn(eventoMediator.eventoDAO, 'getEventosPorDataeUGe').and.returnValue(promiseEventos);

        let parseFileTemplate = {
            parse() {
                return 'planilha';
            }
        };

        spyOn(eventoMediator.parseEventosXlsx, 'factory').and.returnValue(parseFileTemplate);
    });

    it('Retornar uma planilha com eventos com base na pesquisa:', (done) => {
        eventoMediator.pesquisarEventos('ALUXG', new Date(2018, 01, 01), new Date(2018, 12, 31)).then(data => {
            expect(data).toBe('planilha');
            done();
        }).catch(error => {
            console.log('test error:' + error);
            done();
        });
    });

    it('Extrair ids das uges para um array:', () => {
        let ids = eventoMediator.extrairIdsUges([{idUge:'1'}, {idUge:'2'}, {idUge:'3'}]);
        expect(ids).toEqual(['1', '2', '3']);
    });
});



