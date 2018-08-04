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
        let insert = jasmine.createSpy('insert');

        let dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { id: '1', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 1, 1) },
                    { id: '2', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 3, 1) },
                    { id: '3', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 3, 2) },
                    { id: '4', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 3, 30)},
                    { id: '5', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 4, 30)},
                    { id: '6', idClassificacaoOrigem: 'GAG', dataVerificada: new Date(2018, 5, 30) },
                    { id: '7', idClassificacaoOrigem: 'GCB', dataVerificada: new Date(2018, 6, 30) }
                ]),
                update: update,
                insert: insert
            }
        };
        criterios.aplicar(regraClassificacaoOrigem, dataset);
        expect(update.calls.count()).toEqual(2);
        expect(insert.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith({ id: '3', idClassificacaoOrigem: 'GIC', dataVerificada: new Date(2018, 3, 2) });
        expect(update).toHaveBeenCalledWith({ id: '4', idClassificacaoOrigem: 'GIC', dataVerificada: new Date(2018, 3, 30)});
    });

});