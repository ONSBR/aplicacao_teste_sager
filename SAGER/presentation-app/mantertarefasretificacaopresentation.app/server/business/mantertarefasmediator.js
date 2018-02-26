const TarefaDAO = require('../dao/tarefadao');


class ManterTarefasMediator {

    constructor() {
        this.tarefaDAO = new TarefaDAO();
    }

    inserirTarefa(nomeTarefa) {
        return this.tarefaDAO.inserirTarefa(nomeTarefa);
    }

    listarTarefas() {
        return this.tarefaDAO.listarTarefas();
    }

    uploadplanilha(){
        
    }

}

module.exports = ManterTarefasMediator