const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de classificação origem.', () => {
        let regraClassificacaoOrigem = {
            tipoRegra: 'Classificação de Origem do Evento',
            regraDe: 'GUM', 
            regraPara: 'GIC',
            dataInicioVigencia: new Date(2018, 3, 1),
            dataFimVigencia: new Date(2018, 3, 30)
        };
        let update = jasmine.createSpy('update');

        let dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '1', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 1, 1) },
                    { id: '2', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 3, 1) },
                    { id: '2', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 3, 2) },
                    { id: '3', idClassificacaoOrigem: 'GUM', dataVerificada: data5Junho },
                    { id: '4', idClassificacaoOrigem: 'GAG', dataVerificada: data5Junho },
                    { id: '5', idClassificacaoOrigem: 'GCB', dataVerificada: data5Junho }
                ]),
                update: update
            }
        };
        criterios.aplicar(regraClassificacaoOrigem, dataset, payload);
        expect(update.calls.count()).toEqual(4);
        expect(update).toHaveBeenCalledWith({ id: '2', idClassificacaoOrigem: 'GIC' });
        expect(update).toHaveBeenCalledWith({ id: '3', idClassificacaoOrigem: 'GIC' });
    });

});