const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critérios de franquias: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Deve atualizar Franquia GIC.', () => {
        let regraFranquia = { tipoRegra: 'Franquia GIC', regraDe: 'ALUXG-0UG5', regraPara: '200' };
        let update = jasmine.createSpy('update');
        let dataset = {
            unidadegeradora: {
                collection: Enumerable.from([
                    { idUge: 'ALUXG-0UG4', franquiaGIC: '500' },
                    { idUge: 'ALUXG-0UG5', franquiaGIC: '500' }
                ]),
                update: update
            }
        };
        criterios.aplicar(regraFranquia, dataset);
        expect(update.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith( { idUge: 'ALUXG-0UG5', franquiaGIC: '200' });
    });

});