const CenarioBusiness = require('../../../process/criterios/cenariobusiness');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let cenarioBusiness;
    let regraPotenciaDisponivelMaior;
    let update;
    let dataset;

    beforeEach(function () {
        cenarioBusiness = new CenarioBusiness();
        regraPotenciaDisponivelMenor = { tipoRegra: 'Potência Disponível', regraDe: 'ALUXG-0UG2', regraPara: '100' };
        regraPotenciaDisponivelMaior = { tipoRegra: 'Potência Disponível', regraDe: 'ALUXG-0UG1', regraPara: '5000' };
        update = jasmine.createSpy('update');

        dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { idEvento: 1, idUge: 'ALUXG-0UG1', potenciaDisponivel: '1000', idCondicaoOperativa: 'NOT', idClassificacaoOrigem: 'GUM' },
                    { idEvento: 2, idUge: 'ALUXG-0UG1', potenciaDisponivel: '1000', idCondicaoOperativa: 'NOT', idClassificacaoOrigem: 'GUM' },
                    { idEvento: 3, idUge: 'ALUXG-0UG1', potenciaDisponivel: '1000', idCondicaoOperativa: 'NOT', idClassificacaoOrigem: 'GUM' }
                ]),
                update: update
            }
        };
    });

    it('RNI - 202  Alteração da potência para cálculo para um valor menor. i', () => {
        let evento = { idEvento: 2, idUge: 'ALUXG-0UG1', potenciaDisponivel: '10000' };
        cenarioBusiness.updatePotencia(regraPotenciaDisponivelMaior, evento, dataset);

        expect(update.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith({ 
            idEvento: 2, 
            idUge: 'ALUXG-0UG1', 
            potenciaDisponivel: '100', 
            idCondicaoOperativa : 'NOR',
            idClassificacaoOrigem: undefined });
    });

    it('RNI - 202  Alteração da potência para cálculo para um valor menor. ii', () => {
        let evento = { idEvento: 1, idUge: 'ALUXG-0UG1', potenciaDisponivel: '100', idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GUM' };
        cenarioBusiness.updatePotencia(regraPotenciaDisponivelMenor, evento, dataset);
        expect(update.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith({
            idEvento: 1, idUge: 'ALUXG-0UG1', potenciaDisponivel: '100', idCondicaoOperativa: 'NOR', idClassificacaoOrigem: undefined
        });
    });

});