const ManterTarefasMediator = require('../../business/mantertarefasmediator');
const ManterTarefasMediatorSpecHelper = require('./mantertarefasmediatorspechelper');
const EventoMudancaEstadoOperativoTarefa = require('../../model/eventomudancaestadooperativotarefa');

describe('ManterTarefasMediator deve:', function () {

    let manterTarefasMediator;

    beforeEach(function () {
        manterTarefasMediator = new ManterTarefasMediator();
        promise = new Promise((resolve, reject) => {
            resolve([{ id: '1' }]);
        });

        spyOn(manterTarefasMediator.tarefaDAO, 'inserirTarefa').and.callFake(function (nomeTarefa) { });
        spyOn(manterTarefasMediator.tarefaDAO, 'consultarEventosRetificacaoPorNomeTarefa').and.returnValue(promise);
        spyOn(manterTarefasMediator.tarefaDAO, 'listarTarefas').and.returnValue(promise);
        spyOn(manterTarefasMediator.parseEventosXlsx, 'factory').and.returnValue({
            parse() {
                return 'content xlsx';
            }
        });

    });

    it('Preencher os eventos de retificação através de uma planilha:', () => {
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

    it('Insere uma tarefa:', () => {
        manterTarefasMediator.inserirTarefa('tarefa teste');
        expect(manterTarefasMediator.tarefaDAO.inserirTarefa).toHaveBeenCalledWith('tarefa teste');
    });

    it('Listar tarefas:', () => {
        manterTarefasMediator.listarTarefas();
        expect(manterTarefasMediator.tarefaDAO.listarTarefas).toHaveBeenCalled();
    });

    it('Realizar download da planilha de eventos:', (done) => {
        manterTarefasMediator.downloadPlanilha('tarefateste').then(data => {
            expect(data).toBe('content xlsx');
            done();
        }).catch(error => {
            console.log(`Test error ${error}`)
        });
    });

    it('Excluir as tarefas:', (done) => {
        spyOn(manterTarefasMediator.tarefaDAO, 'excluirTarefa').and.returnValue(promise);
        let tarefa = {id: '1', nome : 'tarefateste'};
        manterTarefasMediator.excluirTarefa(tarefa).then(data => {
            expect(data[0].id).toBe('1');
            done();
        }).catch(error => {
            console.log(`Test error ${error}`)
        });
    });

});



