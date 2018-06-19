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
            unidadegeradora: {
                collection: Enumerable.from([
                    { idUge: 'ALUXG-0UG1', franquia: '100' },
                    { idUge: 'ALUXG-0UG2', franquia: '200' },
                    { idUge: 'ALUXG-0UG3', franquia: '300' },
                    { idUge: 'ALUXG-0UG4', franquia: '400' },
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