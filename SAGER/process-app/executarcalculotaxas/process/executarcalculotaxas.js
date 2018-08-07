const SDK = require("plataforma-sdk/worker/sdk");
const executor = require("./business/executorcalculotaxas");

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject, eventManager) => {

    console.log("ENTRYPOINT PRINCIPAL DO PROCESSO");
    console.log("Executando o calculo de taxas");
    
    console.time("timer_process");
    try {
        executor.executarCalculoTaxas(context, eventManager);
        console.timeEnd("timer_process");
        resolve();
    } catch (error) {
        console.log("error: " + error.stack);
        console.timeEnd("timer_process");
        reject(error);
    }
});

