const config = require('../config');
const ManterTarefasMediator = require('../business/mantertarefasmediator');
const dispatcher = require("../dispatcher/dispatcher");

class ManterTarefasController {

    constructor(domainPromiseHelper) {
        this.manterTarefasMediator = new ManterTarefasMediator();
    }

    /**
     * @method inserirTarefa
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description cadastra a tarefa de retificação
     */
    inserirTarefa(request, response) {
        let nomeTarefa = request.body.nomeTarefa;
        dispatcher.dispatch("presentation.insere.tarefa.request", { nomeTarefa: nomeTarefa }).then(data => {
            response.send(data);
        }).catch(e => {
            this.responseError('Erro durante a inserção da tarefa', e, response);
        });
    }

    /**
     * @method listarTarefas
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todas as tarefas de retificação cadastradas
    */
    listarTarefas(request, response) {
        this.manterTarefasMediator.listarTarefas().then(data => { response.send(data) }).
            catch(e => {
                this.responseError('Erro durante a consulta de tarefas', e, response);
            });
    }

    /**
     * @method uploadPlanilha
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Realiza o upload da planilha para uma tarefa
    */
    uploadPlanilha(request, response) {
        if (!request.files) {
            return response.status(400).send('No files were uploaded.');
        }

        let nomeTarefa = request.body.nomeTarefa;
        let planilha = request.files.planilha;

        dispatcher.dispatch("presentation.uploadplanilha.tarefa.request", { nomeTarefa: nomeTarefa, planilha: planilha }).then(data => { response.send(data) }).
            catch(e => {
                this.responseError('Erro no upload de eventos', e, response);
            });
    }

    /**
     * @method downloadPlanilha
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Realiza o download da planilha de eventos a partir da tarefa.
    */
    downloadPlanilha(request, response) {
        let nomeTarefa = request.query.nomeTarefa;
        this.manterTarefasMediator.downloadPlanilha(nomeTarefa).then(contentXlsx => {
            response.setHeader('Content-disposition', `attachment; filename=eventos.xlsx`);
            response.setHeader('Content-Length', contentXlsx.length);
            response.write(contentXlsx, 'binary');
            response.end();
        }).catch(e => {
            this.responseError('Erro no download da planilha', e, response);
        });
    }

    /**
     * @method excluirTarefa
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Exclui a tarefa e os eventos de retificação associados.
    */
    excluirTarefa(request, response) {
        let tarefa = request.body.tarefa;
        dispatcher.dispatch("presentation.exclui.tarefa.request", { tarefa: tarefa, nomeTarefa: tarefa.nome }).then(
            data => { response.send(data); }).
            catch(e => {
                this.responseError('Erro durante a exclusão da tarefa', e, response);
            });
    }

    /**
      * @param {Request} request Objeto de request
      * @param {Response} response Objeto de response
      * @description aplica a tarefa de retificação
      */
    aplicarTarefa(request, response) {
        let nomeTarefa = request.query.nomeTarefa;
        dispatcher.dispatch("presentation.aplica.tarefa.request", { nomeTarefa: nomeTarefa }).
            then(menorDataEventoAlterado => {
                dispatcher.dispatch("presentation.executaretificacao.tarefa.request", { menorDataEventoAlterado: menorDataEventoAlterado }).then(data => {
                    response.send(data);
                });
            }).catch(e => {
                this.responseError('Erro durante a aplicação da tarefa', e, response);
            });
    }

    responseError(message, e, response) {
        let errorMessage = `${message}: ${e.toString()}`
        response.status(500).send(errorMessage);
    }
}

module.exports = ManterTarefasController