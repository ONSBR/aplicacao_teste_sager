const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Franquia.', () => {
        let regraFranquia = { tipoRegra: 'Franquia', regraDe: 'ALUXG', regraPara: '200' };
        let update = jasmine.createSpy('update');
        let dataset = {
            usina: {
                collection: Enumerable.from([
                    { id: '1', idUsina: 'BAUSU', franquia : '1000'},
                    { id: '2', idUsina: 'PIUBE', franquia : '1000'},
                    { id: '3', idUsina: 'ALUXG', franquia : '1000'},
                    { id: '4', idUsina: 'APCN', franquia : '1000'},
                    { id: '5', idUsina: 'PHCEE', franquia : '1000'}
                ]),
                update: update
            }

        };
        criterios.aplicar(regraFranquia, dataset);
        expect(update.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith( { id: '3', idUsina: 'ALUXG', franquia : '200'});
    });

});