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
        this.manterTarefasMediator.uploadplanilha(request.body.nomeTarefa, request.files.planilha).then(data => { response.send(data) }).
            catch(e => {
                console.log(`Erro no upload de eventos=:${e.toString()}`);
                response.status(400).send(`Erro no upload de eventos=:${e.toString()}`);
            });
    }

    /**
     * @method downloadPlanilha
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Realiza o download da planilha de eventos a partir da tarefa.
    */
    downloadPlanilha(request, response) {
        let nomeTarefa = request.query.nometarefa;
        this.manterTarefasMediator.downloadPlanilha(nomeTarefa).then(contentXlsx => {
            response.setHeader('Content-disposition', `attachment; filename=eventos.xlsx`);
            response.setHeader('Content-Length', contentXlsx.length);
            response.write(contentXlsx, 'binary');
            response.end();
        }).catch(e => {
            console.log(`Erro no download da planilha=:${e.toString()}`);
            response.status(400).send(`Erro no download da planilha=:${e.toString()}`);
        });
    }

    /**
     * @method excluirTarefa
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Exclui a tarefa através do id.
    */
   excluirTarefa(request, response) {
        let tarefaId = request.body.tarefaId;
        this.manterTarefasMediator.excluirTarefa(tarefaId).then(data => { response.send(data) }).
            catch(e => { 
                console.log(`Erro durante a exclusão da tarefa: ${e.toString()}`);
                response.status(400).send(`Erro durante a exclusão da tarefa: ${e.toString()}`); 
            });
   }

}

module.exports = ManterTarefasController