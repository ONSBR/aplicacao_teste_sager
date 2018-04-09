const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();
const manterTarefasMediator = new (require('../business/mantertarefasmediator'))();

dispatcher.register("presentation.insere.tarefa.request", manterTarefasMediator.inserirTarefa);
dispatcher.register("presentation.exclui.tarefa.request", manterTarefasMediator.excluirTarefa);

module.exports = dispatcher;