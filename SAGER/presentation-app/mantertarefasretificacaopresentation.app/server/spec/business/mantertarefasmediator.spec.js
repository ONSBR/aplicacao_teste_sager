const ManterTarefasMediator = require('../../business/mantertarefasmediator');
const ManterTarefasMediatorSpecHelper = require('./mantertarefasmediatorspechelper');
const EventoMudancaEstadoOperativoTarefa = require('../../model/eventomudancaestadooperativotarefa');

describe('ManterTarefasMediator deve:', function () {

    it('Preencher os eventos de retificação através de uma planilha:', () => {
        let manterTarefasMediator = new ManterTarefasMediator();
        let planilha = ManterTarefasMediatorSpecHelper.criarPlanilha();
        let nomeTarefa = 'tarefaTeste';
        let eventosRetificacao = manterTarefasMediator.preencherEventosRetificacaoAPartirPlanilha(nomeTarefa, planilha);
        expect(eventosRetificacao).toBeDefined();

        expect(eventosRetificacao[0].idEvento).toBe('400872');
        expect(eventosRetificacao[0].nomeTarefa).toBe('tarefaTeste');
        expect(eventosRetificacao[0].idUge).toBe('ALUXG-0UG1');
        expect(eventosRetificacao[0].idClassificacaoOrigem).toBe('GAG');
        expect(eventosRetificacao[0].idEstadoOperativo).toBe('DCA');
        expect(eventosRetificacao[0].idCondicaoOperativa).toBe('');
        expect(eventosRetificacao[0].potenciaDisponivel).toBe('');
        expect(eventosRetificacao[0].dataVerificada).toBeUndefined();
        expect(eventosRetificacao[0].operacao).toBe('i');
    });

});



