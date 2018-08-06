const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de estado operativo.', () => {
        let regraEstadoOperativo = {
            tipoRegra: 'Estado Operativo do Evento',
            regraDe: 'DCA',
            regraPara: 'DES',
            dataInicioVigencia: new Date(2018, 3, 1),
            dataFimVigencia: new Date(2018, 3, 30)
        };
        let update = jasmine.createSpy('update');
        let insert = jasmine.createSpy('insert');

        let dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '1', idEstadoOperativo: 'DCA', dataVerificada: new Date(2018, 1, 1) },
                    { id: '2', idEstadoOperativo: 'DCA', dataVerificada: new Date(2018, 3, 1) },
                    { id: '3', idEstadoOperativo: 'DCA', dataVerificada: new Date(2018, 3, 2) },
                    { id: '4', idEstadoOperativo: 'DCA', dataVerificada: new Date(2018, 3, 30) },
                    { id: '5', idEstadoOperativo: 'DCA', dataVerificada: new Date(2018, 4, 2) }
                ]),
                update: update,
                insert: insert
            }
        };
        criterios.aplicar(regraEstadoOperativo, dataset);

        expect(update.calls.count()).toEqual(2);
        expect(insert.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith({ id: '3', idEstadoOperativo: 'DES', dataVerificada: new Date(2018, 3, 2) });
        expect(update).toHaveBeenCalledWith({ id: '4', idEstadoOperativo: 'DES', dataVerificada: new Date(2018, 3, 30) });
    });

});