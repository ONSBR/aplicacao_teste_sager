const config = require('../config');
const ManterTarefasMediator = require('../business/mantertarefasmediator');

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
        this.manterTarefasMediator.inserirTarefa(nomeTarefa).then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante a inserção da tarefa: ${e.toString()}`) });
    }

    /**
     * @method listarTarefas
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todas as tarefas de retificação cadastradas
    */
    listarTarefas(request, response) {
        this.manterTarefasMediator.listarTarefas().then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante a consulta de tarefas: ${e.toString()}`) });
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
        this.manterTarefasMediator.uploadplanilha(request).then(data => { response.send(data) }).
            catch(e => {
                console.log(`Erro no upload de eventos=:${e.toString()}`);
                response.status(400).send(`Erro no upload de eventos=:${e.toString()}`);
            });
    }

}

module.exports = ManterTarefasController