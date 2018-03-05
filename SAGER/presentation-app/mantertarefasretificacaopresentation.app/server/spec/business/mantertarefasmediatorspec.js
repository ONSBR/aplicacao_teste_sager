const ManterTarefasMediator = require('../../business/mantertarefasmediator');
const ManterTarefasMediatorSpecHelper = require('./mantertarefasmediatorspechelper');

describe('ManterTarefasMediator deve:', function () {

    it('Preencher os eventos de retificação através de uma planilha:', () => {
        let manterTarefasMediator = new ManterTarefasMediator();
        let planilha = ManterTarefasMediatorSpecHelper.criarPlanilha();
        let nomeTarefa = 'tarefaTeste';
        let eventosRetificacao = manterTarefasMediator.preencherEventosRetificacaoAPartirPlanilha(nomeTarefa, planilha);
        expect(eventosRetificacao).toBeDefined();

        expect(eventosRetificacao).toEqual([
            { idEvento: '400872', nomeTarefa: 'tarefaTeste', idUge: 'ALUXG-0UG1', idClassificacaoOrigem: 'GAG', idEstadoOperativo: 'DCA', idCondicaoOperativa: '', dataVerificada: undefined, potenciaDisponivel: '', operacao: 'i', idUsina: 'ALUXG' },
            { idEvento: '400872', nomeTarefa: 'tarefaTeste', idUge: 'ALUXG-0UG1', idClassificacaoOrigem: 'GAG', idEstadoOperativo: 'DCA', idCondicaoOperativa: '', dataVerificada: '', potenciaDisponivel: '', operacao: 'i', idUsina: 'ALUXG' }
        ]);
    });

});



