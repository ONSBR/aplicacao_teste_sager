
const TarefaDAO = new (require("../dao/tarefadao"))();

const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();

const TarefaRetificacao = require('../domain/TarefaRetificacao');


dispatcher.register("presentation.insere.tarefa.request", (context, resolve, reject)=>{
    var entity = new TarefaRetificacao(context.event.payload.nomeTarefa);
    context.dataset.tarefaretificacao.insert(entity);
    resolve(entity);
});

dispatcher.register("presentation.exclui.tarefa.request", (context, resolve, reject)=>{
    console.log(context);
    resolve({"msg":"Executou o exclui"});
});


module.exports = dispatcher;