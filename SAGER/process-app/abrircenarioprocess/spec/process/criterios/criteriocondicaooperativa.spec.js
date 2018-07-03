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
        let dataJaneiro = new Date(2018, 0, 1);
        let data5Junho = new Date(2018, 5, 5);

        let payload = {
            dataInicioVigencia: new Date(2018, 5, 1),
            dataFimVigencia: new Date(2018, 5, 15)
        }

        let dataset = {
            condicaooperativaevento: {
                collection: Enumerable.from([
                    { id: '2', idCondicaoOperativa: 'NOR' },
                    { id: '3', idCondicaoOperativa: 'NOR' }
                ]),
                update: update
            },
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '1', idCondicaoOperativa: 'NOR', dataVerificada: dataJaneiro},
                    { id: '2', idCondicaoOperativa: 'NOR', dataVerificada: data5Junho},
                    { id: '3', idCondicaoOperativa: 'NOR', dataVerificada: data5Junho}
                ]),
                update: update
            }

        };
        criterios.aplicar(regraCondicaoOperativa, dataset, payload);
        expect(update.calls.count()).toEqual(4);
        expect(update).toHaveBeenCalledWith({ id: '2', idCondicaoOperativa: 'NFO' });
        expect(update).toHaveBeenCalledWith({ id: '3', idCondicaoOperativa: 'NFO' });
    });

});