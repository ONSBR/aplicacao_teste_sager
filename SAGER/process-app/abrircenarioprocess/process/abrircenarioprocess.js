const SDK = require('plataforma-sdk/worker/sdk');
const Cenario = require('./abrircenario/cenario');
const EventosBusiness = require('eventos_business_rules/business/eventomudancaestadooperativobusiness');

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject, fork) => {
    console.log('Executando o processo de abertura de cenário:');
    console.log(context.event);
    try {
        let cenario = new Cenario();
        cenario.abrir(context.event.payload, fork);
        let eventos = context.dataset.eventomudancaestadooperativo.collection.toArray();
        eventos.forEach(evento => {
            context.dataset.eventomudancaestadooperativo.update(evento);                      
        });
        cenario.aplicarCriterios(context);
        resolve();
    } catch (error) {
        console.log('error: ' + error.stack);
        reject(error);
    }
});
