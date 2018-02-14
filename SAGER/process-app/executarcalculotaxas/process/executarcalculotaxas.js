const SDK = require("plataforma-sdk/worker/sdk");
const executor = require("./business/executorcalculotaxas");

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject, eventManager) => {

    console.log("Executando o calculo de taxas");

    try {
        executor.executarCalculoTaxas(context, eventManager);
        resolve();
    } catch (error) {
        console.log("error: " + error.stack);
        reject(error);
    }
});

