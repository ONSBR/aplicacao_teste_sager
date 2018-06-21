const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de potência.', () => {
        let regraPotenciaDisponivel = { tipoRegra: 'Potência Disponível', regraDe: 'ALUXG-0UG1', regraPara: '500' };
        let update = jasmine.createSpy('update');
        let dataset = {
            potenciaunidadegeradora: {
                collection: Enumerable.from([
                    { idUge: 'ALUXG-0UG1', potenciaDisponivel: '100' }
                ]),
                update: update
            }

        };
        criterios.aplicar(regraPotenciaDisponivel, dataset);
        expect(update.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith({ idUge: 'ALUXG-0UG1', potenciaDisponivel: '500' });
    });

});