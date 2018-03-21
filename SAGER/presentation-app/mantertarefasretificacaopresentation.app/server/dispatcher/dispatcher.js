
/*const TarefaDAO = new (require("../dao/tarefadao"))();

const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();



dispatcher.register("presentation.insere.tarefa.request", (context)=>{
    var event = context.event;
    var entity = TarefaDAO.createTarefaRetificacaoArgs(event.payload.nomeTarefa);
    if (event.payload.nomeTarefa == ""){
        throw new Error("Nome da tarefa não deve estar vazio");
    }
    context.entities.tarefaretificacao.insert(entity);
});

module.exports = dispatcher;*/