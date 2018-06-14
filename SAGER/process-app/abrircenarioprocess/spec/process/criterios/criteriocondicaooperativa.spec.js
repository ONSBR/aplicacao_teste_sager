const Criterios = require('../../../process/criterios/criterios');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de condição operativa.', () => {
        let regraClassificacaoOrigem = { tipoRegra: 'Condição Operativa do Evento', regraDe: 'NOR', regraPara: 'NFO' };
        let update = jasmine.createSpy('update');
        let dataset = {
            eventomudancaestadooperativo: {
                collection: [
                    { id: '1', idCondicaoOperativa: 'NOT' },
                    { id: '2', idCondicaoOperativa: 'NOT' },
                    { id: '3', idCondicaoOperativa: 'NOT' },
                    { id: '4', idCondicaoOperativa: 'NOR' },
                    { id: '5', idCondicaoOperativa: 'NOR' }
                ],
                update: update
            }

        };
        criterios.aplicar(regraClassificacaoOrigem, dataset);
        expect(update.calls.count()).toEqual(2);
        expect(update).toHaveBeenCalledWith({ id: '4', idCondicaoOperativa: 'NFO' });
        expect(update).toHaveBeenCalledWith({ id: '5', idCondicaoOperativa: 'NFO' });
    });

});