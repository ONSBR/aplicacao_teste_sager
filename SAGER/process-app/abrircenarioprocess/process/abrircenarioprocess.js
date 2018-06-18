const SDK = require('plataforma-sdk/worker/sdk');
const Cenario = require('./abrircenario/cenario');

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject, fork) => {
    console.log('Executando o processo de abertura de cenário');
    console.log(context.event);
    try {
        let cenario = new Cenario();
        cenario.abrir(context.event.payload, fork);    
        cenario.aplicarCriterios(context.event.payload, context.dataset);
        resolve();
    } catch (error) {
        console.log('error: ' + error.stack);
        reject(error);
    }
});
