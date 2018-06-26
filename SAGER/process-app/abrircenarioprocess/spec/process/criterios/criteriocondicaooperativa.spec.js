const Criterios = require('../../../process/criterios/criterios');
var Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de condição operativa.', () => {
        let regraCondicaoOperativa = { tipoRegra: 'Condição Operativa do Evento', regraDe: 'NOR', regraPara: 'NFO' };
        let update = jasmine.createSpy('update');
        let dataset = {
            condicaooperativaevento: {
                collection: Enumerable.from([
                    { id: '4', idCondicaoOperativa: 'NOR' },
                    { id: '5', idCondicaoOperativa: 'NOR' }
                ]),
                update: update
            },
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '3', idCondicaoOperativa: 'NOT' },
                    { id: '4', idCondicaoOperativa: 'NOR' },
                    { id: '5', idCondicaoOperativa: 'NOR' }
                ]),
                update: update
            }

        };
        criterios.aplicar(regraCondicaoOperativa, dataset);
        expect(update.calls.count()).toEqual(4);
        expect(update).toHaveBeenCalledWith({ id: '4', idCondicaoOperativa: 'NFO' });
        expect(update).toHaveBeenCalledWith({ id: '5', idCondicaoOperativa: 'NFO' });
    });

});