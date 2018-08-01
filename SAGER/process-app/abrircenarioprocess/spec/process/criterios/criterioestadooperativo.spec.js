const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de estado operativo.', () => {
        let regraEstadoOperativo = { tipoRegra: 'Estado Operativo do Evento', regraDe: 'DCA', regraPara: 'DES' };
        let update = jasmine.createSpy('update');
        let dataJaneiro = new Date(2018, 0, 1);
        let data5Junho = new Date(2018, 5, 5);

        let payload = {
            dataInicioVigencia: new Date(2018, 5, 1),
            dataFimVigencia: new Date(2018, 5, 15)
        }

        let dataset = {
            estadooperativoevento: {
                collection: Enumerable.from([
                    { id: '2', idEstadoOperativo: 'DCA' },
                    { id: '5', idEstadoOperativo: 'DCA' }
                ]),
                update: update
            },
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '1', idEstadoOperativo: 'DCA', dataVerificada: dataJaneiro },
                    { id: '2', idEstadoOperativo: 'DCA', dataVerificada: data5Junho },
                    { id: '3', idEstadoOperativo: 'DES', dataVerificada: data5Junho },
                    { id: '4', idEstadoOperativo: 'RDP', dataVerificada: data5Junho },
                    { id: '5', idEstadoOperativo: 'DCA', dataVerificada: data5Junho }
                ]),
                update: update
            }
        };
        criterios.aplicar(regraEstadoOperativo, dataset, payload);
        expect(update.calls.count()).toEqual(4);
        expect(update).toHaveBeenCalledWith({ id: '2', idEstadoOperativo: 'DES' });
        expect(update).toHaveBeenCalledWith({ id: '5', idEstadoOperativo: 'DES' });
    });

});