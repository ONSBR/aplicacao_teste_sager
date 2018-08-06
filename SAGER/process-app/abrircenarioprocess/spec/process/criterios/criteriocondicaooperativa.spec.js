const Criterios = require('../../../process/criterios/criterios');
var Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de condição operativa.', () => {
        let regraCondicaoOperativa = {
            tipoRegra: 'Condição Operativa do Evento',
            regraDe: 'NOR', 
            regraPara: 'NFO',
            dataInicioVigencia: new Date(2018, 3, 1),
            dataFimVigencia: new Date(2018, 3, 30)
        };

        let update = jasmine.createSpy('update');
        let insert = jasmine.createSpy('insert');

        let dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '1', idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 1, 1) },
                    { id: '2', idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 3, 1) },
                    { id: '3', idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 3, 2) },
                    { id: '4', idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 3, 30) },
                    { id: '5', idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 4, 30) }
                ]),
                update: update,
                insert: insert
            }

        };
        criterios.aplicar(regraCondicaoOperativa, dataset);
        expect(update.calls.count()).toEqual(2);
        expect(insert.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith({ id: '3', idCondicaoOperativa: 'NFO', dataVerificada: new Date(2018, 3, 2) });
        expect(update).toHaveBeenCalledWith({ id: '4', idCondicaoOperativa: 'NFO', dataVerificada: new Date(2018, 3, 30) });
    });

});