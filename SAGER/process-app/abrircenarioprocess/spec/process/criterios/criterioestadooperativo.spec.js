const Criterios = require('../../../process/criterios/criterios');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de estado operativo.', () => {
        let regraClassificacaoOrigem = { tipoRegra: 'Estado Operativo do Evento', regraDe: 'DCA', regraPara: 'DES' };
        let update = jasmine.createSpy('update');
        let dataset = {
            eventomudancaestadooperativo: {
                collection: [
                    { id: '1', idEstadoOperativo: 'DCA' },
                    { id: '2', idEstadoOperativo: 'RDP' },
                    { id: '3', idEstadoOperativo: 'DES' },
                    { id: '4', idEstadoOperativo: 'RDP' },
                    { id: '5', idEstadoOperativo: 'DCA' }
                ],
                update: update
            }

        };
        criterios.aplicar(regraClassificacaoOrigem, dataset);
        expect(update.calls.count()).toEqual(2);
        expect(update).toHaveBeenCalledWith({ id: '1', idEstadoOperativo: 'DES' });
        expect(update).toHaveBeenCalledWith({ id: '5', idEstadoOperativo: 'DES' });
    });

});