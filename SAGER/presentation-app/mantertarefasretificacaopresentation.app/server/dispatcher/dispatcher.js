const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();
const manterTarefasMediator = new (require('../business/mantertarefasmediator'))();

dispatcher.register("presentation.uploadplanilha.tarefa.request", (context, resolve, reject)=>{
    manterTarefasMediator.uploadPlanilha(context, resolve, reject);
});
dispatcher.register("presentation.insere.tarefa.request", manterTarefasMediator.inserirTarefa);
dispatcher.register("presentation.exclui.tarefa.request", manterTarefasMediator.excluirTarefa);
dispatcher.register("presentation.aplica.tarefa.request", (context, resolve, reject, eventManager)=>{
    manterTarefasMediator.aplicarTarefa(context, resolve, reject);
});
dispatcher.register("presentation.executaretificacao.tarefa.request", (context, resolve, reject, eventManager)=>{
    manterTarefasMediator.executarRetificacao(context, resolve, reject, eventManager);
});

module.exports = dispatcher;