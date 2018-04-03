
const TarefaDAO = new (require("../dao/tarefadao"))();

const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();



dispatcher.register("presentation.insere.tarefa.request", (context, resolve, reject)=>{
    var entity = TarefaDAO.createTarefaRetificacaoArgs(context.event.payload.nomeTarefa);
    context.dataset.tarefaretificacao.insert(entity);
    resolve(entity);
});

dispatcher.register("presentation.atualiza.tarefa.request", (scope, ok, error)=>{

});


module.exports = dispatcher;