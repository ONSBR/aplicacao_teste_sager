const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de classificação origem.', () => {
        let regraClassificacaoOrigem = { tipoRegra: 'Classificação de Origem do Evento', regraDe: 'GUM', regraPara: 'GIC' };
        let update = jasmine.createSpy('update');
        let dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '1', idClassificacaoOrigem: 'GOT' },
                    { id: '2', idClassificacaoOrigem: 'GUM' },
                    { id: '3', idClassificacaoOrigem: 'GUM' },
                    { id: '4', idClassificacaoOrigem: 'GAG' },
                    { id: '5', idClassificacaoOrigem: 'GCB' }
                ]),
                update: update
            }

        };
        criterios.aplicar(regraClassificacaoOrigem, dataset);
        expect(update.calls.count()).toEqual(2);
        expect(update).toHaveBeenCalledWith({ id: '2', idClassificacaoOrigem: 'GIC' });
        expect(update).toHaveBeenCalledWith({ id: '3', idClassificacaoOrigem: 'GIC' });
    });

});