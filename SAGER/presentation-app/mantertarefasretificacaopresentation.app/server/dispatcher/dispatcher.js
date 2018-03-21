
const TarefaDAO = new (require("../dao/tarefadao"))();

const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();



dispatcher.register("presentation.insere.tarefa.request", (scope)=>{
    return new Promise((resolve)=>{
        var entity = TarefaDAO.createTarefaRetificacaoArgs(context.nomeTarefa);
        console.log(entity);
        resolve([entity]);
    });
});

dispatcher.register("presentation.atualiza.tarefa.request", (scope)=>{
    return new Promise((resolve)=>{
        scope.bind(scope.params.tarefa);
        scope.context.save().then(resolve);
    });
});


module.exports = dispatcher;