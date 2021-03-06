const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();
const cenarioBusiness = new (require('../business/cenariobusiness'))();

dispatcher.register("presentation.insere.cenario.request", (context, resolve, reject)=>{
    cenarioBusiness.inserirCenario(context, resolve, reject);
});

dispatcher.register("presentation.atualiza.cenario.request", (context, resolve, reject)=>{
    cenarioBusiness.alterarCenario(context, resolve, reject);
});

dispatcher.register("presentation.exclui.cenario.request", (context, resolve, reject)=>{
    cenarioBusiness.excluirCenario(context, resolve, reject);
});

dispatcher.register("presentation.ativarinativarcenario.cenario.request", (context, resolve, reject, fork)=>{
    cenarioBusiness.ativarInativarCenario(context, resolve, reject, fork);
});

dispatcher.register("presentation.incorporar.cenario.cenario.request", (context, resolve, reject)=>{
    cenarioBusiness.incorporarCenario(context, resolve, reject);
});

module.exports = dispatcher;