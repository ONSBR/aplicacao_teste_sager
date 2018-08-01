const dispatcher = new (require('plataforma-sdk/worker/dispatcher'))();
const reprocessamentoBusiness = new (require('../business/reprocessamentobusiness'))();

dispatcher.register("presentation.aprova.reprocessamento.request", (context, resolve, reject)=>{
    reprocessamentoBusiness.aprovarReprocessamentoPendente(context, resolve, reject);
});

module.exports = dispatcher;