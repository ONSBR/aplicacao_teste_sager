const CenarioBusiness = require('../../../process/criterios/cenariobusiness');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let cenarioBusiness;
    let regraPotenciaDisponivelMaior;
    let update;
    let dataset;

    beforeEach(function () {
        cenarioBusiness = new CenarioBusiness();
        regraPotenciaDisponivelMaior = { tipoRegra: 'Potência Disponível', regraDe: 'ALUXG-0UG1', regraPara: 5000 };
        update = jasmine.createSpy('update');

        dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { idEvento: 1, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOT', dataVerificada: new Date(2018, 0, 1) },
                    { idEvento: 2, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 0, 2) },
                    { idEvento: 3, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 0, 3) },
                    { idEvento: 4, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOT', dataVerificada: new Date(2018, 0, 4) },
                    { idEvento: 5, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 0, 31)},
                    { idEvento: 6, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 1, 1, 0, 0, 0)}
                ]),
                update: update
            }
        };
    });

    it('RNH064 - Reflexão de alteração de último evento em evento espelho.', () => {
        let evento = { idEvento: 5, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 0, 31)};
        cenarioBusiness.updatePotenciaDisponivel(regraPotenciaDisponivelMaior, evento, dataset);

        expect(update.calls.count()).toEqual(2);

        expect(update).toHaveBeenCalledWith({
            idEvento: 5,
            idUge: 'ALUXG-0UG1',
            potenciaDisponivel: 5000,
            idCondicaoOperativa: 'NOR',
            idClassificacaoOrigem: '',
            dataVerificada: new Date(2018, 0, 31)
        });
        expect(update).toHaveBeenCalledWith({
            idEvento: 6,
            idUge: 'ALUXG-0UG1',
            potenciaDisponivel: 5000,
            idCondicaoOperativa: 'NOR',
            idClassificacaoOrigem: '',
            dataVerificada: new Date(2018, 1, 1, 0, 0, 0)
        });
    });

});