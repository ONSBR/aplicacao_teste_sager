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
        let dataJaneiro = new Date(2018, 0, 1);
        let data5Junho = new Date(2018, 5, 5);

        let payload = {
            dataInicioVigencia: new Date(2018, 5, 1),
            dataFimVigencia: new Date(2018, 5, 15)
        }

        let dataset = {
            classificacaoorigemevento: {
                collection: Enumerable.from([
                    { id: '2', idClassificacaoOrigem: 'GUM' },
                    { id: '3', idClassificacaoOrigem: 'GUM' }
                ]),
                update: update
            },
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '1', idClassificacaoOrigem: 'GUM', dataVerificada: dataJaneiro },
                    { id: '2', idClassificacaoOrigem: 'GUM', dataVerificada: data5Junho },
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