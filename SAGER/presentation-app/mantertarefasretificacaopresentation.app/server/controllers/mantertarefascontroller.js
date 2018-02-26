const config = require('../config');
const ManterTarefasMediator = require('../business/mantertarefasmediator');

class ManterTarefasController {

    constructor() {
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
        this.manterTarefasMediator.inserirTarefa(nomeTarefa, response);
    }

}

module.exports = ManterTarefasController