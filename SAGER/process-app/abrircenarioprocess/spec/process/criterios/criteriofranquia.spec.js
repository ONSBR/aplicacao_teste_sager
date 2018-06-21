const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Franquia.', () => {
        let regraFranquia = { tipoRegra: 'Franquia', regraDe: 'ALUXG-0UG5', regraPara: '200' };
        let update = jasmine.createSpy('update');
        let dataset = {
            franquiaunidadegeradora: {
                collection: Enumerable.from([
                    { idUge: 'ALUXG-0UG5', franquia: '500' }
                ]),
                update: update
            }

        };
        criterios.aplicar(regraFranquia, dataset);
        expect(update.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith( { idUge: 'ALUXG-0UG5', franquia: '200' });
    });

});