
const TarefaDAO = new (require("../dao/tarefadao"))();

const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();



dispatcher.register("presentation.insere.tarefa.request", (scope, ok, error)=>{
    console.log(scope);
    ok([scope]);
});

dispatcher.register("presentation.atualiza.tarefa.request", (scope, ok, error)=>{
    scope.bind(scope.params.tarefa);
    var a = 1;
    scope.context.save().then(ok).catch(error);

});


module.exports = dispatcher;