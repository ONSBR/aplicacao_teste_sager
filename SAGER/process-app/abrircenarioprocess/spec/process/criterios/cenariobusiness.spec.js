const CenarioBusiness = require('../../../process/criterios/cenariobusiness');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let cenarioBusiness;
    let regraPotenciaDisponivelMaior;
    let update;
    let dataset;
    let eventos;

    beforeEach(function () {
        cenarioBusiness = new CenarioBusiness();
        regraPotenciaDisponivelMenor = { tipoRegra: 'Potência Disponível', regraDe: 'ALUXG-0UG1', regraPara: 400 };
        regraPotenciaDisponivelMaior = { tipoRegra: 'Potência Disponível', regraDe: 'ALUXG-0UG1', regraPara: 5000 };
        update = jasmine.createSpy('update');
        eventos = [
            { idEvento: 1, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOT', idClassificacaoOrigem: 'GUM' },
            { idEvento: 2, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, 
              idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 2, 2) },
            { idEvento: 3, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, 
              idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 2, 2, 1) },
            { idEvento: 4, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, 
              idCondicaoOperativa: 'NOT', idClassificacaoOrigem: 'GUM', dataVerificada: new Date(2018, 2, 2, 2) },
            { idEvento: 5, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GUM' },
            { idEvento: 6, idUge: 'ALUXG-0UG1', potenciaDisponivel: 310, idCondicaoOperativa: 'RPR', idClassificacaoOrigem: 'GIS' }
        ];

        dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from(eventos),
                update: update
            }
        };
    });

    it('RNI - 203  Alteração da potência para cálculo para um valor maior.  Evento NOR.', () => {
        let evento = { idEvento: 2, 
            idUge: 'ALUXG-0UG1', 
            potenciaDisponivel: 1000, 
            idCondicaoOperativa: 'NOR', 
            idClassificacaoOrigem: 'GUM',
            dataVerificada: new Date(2018, 2, 2) 
        };
        cenarioBusiness.updatePotenciaDisponivel(regraPotenciaDisponivelMaior, evento, eventos, dataset);

        expect(update.calls.count()).toEqual(1);

        expect(update).toHaveBeenCalledWith({
            idEvento: 2,
            idUge: 'ALUXG-0UG1',
            potenciaDisponivel: 5000,
            idCondicaoOperativa: 'NOR',
            idClassificacaoOrigem: '',
            dataVerificada: new Date(2018, 2, 2) 
        });
    });

    it('RNI - 203  Alteração da potência para cálculo para um valor maior.  Evento RPR.', () => {
        let evento = { idEvento: 6, idUge: 'ALUXG-0UG1', potenciaDisponivel: 310, idCondicaoOperativa: 'RPR', idClassificacaoOrigem: 'GIS' };

        cenarioBusiness.updatePotenciaDisponivel(regraPotenciaDisponivelMaior, evento, eventos, dataset);

        expect(update.calls.count()).toEqual(0);
    });

    it('RNI - 203  Alteração da potência para cálculo para um valor maior com evento diferente de NOR', () => {
        let evento = { idEvento: 6, idUge: 'ALUXG-0UG1', potenciaDisponivel: 310, idCondicaoOperativa: 'RPR', idClassificacaoOrigem: 'GIS' };
        cenarioBusiness.updatePotenciaDisponivel(regraPotenciaDisponivelMaior, evento, eventos, dataset);

        expect(update.calls.count()).toEqual(0);
    });

    it('RNI - 202  Alteração da potência para cálculo para um valor menor. Sem evento anterior igual NOT ou TST', () => {
        let evento = { idEvento: 3, 
                       idUge: 'ALUXG-0UG1', 
                       potenciaDisponivel: 1000, 
                       idCondicaoOperativa: 'NOR', 
                       idClassificacaoOrigem: 'GUM',
                       dataVerificada: new Date(2018, 2, 2, 1) };

        cenarioBusiness.updatePotenciaDisponivel(regraPotenciaDisponivelMenor, evento, eventos, dataset);

        expect(update.calls.count()).toEqual(1);
        expect(update).toHaveBeenCalledWith({
            idEvento: 3, 
            idUge: 'ALUXG-0UG1', 
            potenciaDisponivel: 400, 
            idCondicaoOperativa: 'NOR', 
            idClassificacaoOrigem: '', 
            dataVerificada: new Date(2018, 2, 2, 1) 
        });
    });

    it('RNI - 202  Alteração da potência para cálculo para um valor menor. Com evento anterior igual NOT ou TST', () => {
        let evento = { idEvento: 5, idUge: 'ALUXG-0UG1', potenciaDisponivel: 1000, idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GUM' };

        cenarioBusiness.updatePotenciaDisponivel(regraPotenciaDisponivelMenor, evento, eventos, dataset);

        expect(update.calls.count()).toEqual(0);
    });

    it('RNI - 204  Exceção na alteração de classificação de origem.', () => {
        let evento = { idEvento: 1, idUge: 'ALUXG-0UG1', idClassificacaoOrigem: 'GGE', idEstadoOperativo: 'DCA' };
        let regraAlteracaoClassificacao = { tipoRegra: 'Classificação de Origem do Evento', regraDe: 'GGE', regraPara: 'GUM' };
        cenarioBusiness.validateClassificacaoOrigem(evento, regraAlteracaoClassificacao);

        let evento2 = { idEvento: 1, idUge: 'ALUXG-0UG1', idClassificacaoOrigem: 'GGE', idEstadoOperativo: 'LIG' };
        let regraAlteracaoClassificacao2 = { tipoRegra: 'Classificação de Origem do Evento', regraDe: 'GGE', regraPara: 'GIM' };
        cenarioBusiness.validateClassificacaoOrigem(evento2, regraAlteracaoClassificacao2);

        let evento3 = { idEvento: 1, idUge: 'ALUXG-0UG1', idClassificacaoOrigem: 'GGE', idEstadoOperativo: 'DCA' };
        let regraAlteracaoClassificacao3 = { tipoRegra: 'Classificação de Origem do Evento', regraDe: 'GGE', regraPara: 'GIM' };

        expect(
            function () {
                cenarioBusiness.validateClassificacaoOrigem(evento3, regraAlteracaoClassificacao3);
            }
        ).toThrowError('Os eventos com Estado Operativo igual a “DCA” só deverão ter sua origem alterada se  a nova origem for “GOT”, “GGE”, “GUM”, “GCB”, “GTR”, “GAC”, “GAG” ou “GCI”.Os eventos com Estado Operativo igual a “DCA” só deverão ter sua origem alterada se  a nova origem for “GOT”, “GGE”, “GUM”, “GCB”, “GTR”, “GAC”, “GAG” ou “GCI”.');
    })

});