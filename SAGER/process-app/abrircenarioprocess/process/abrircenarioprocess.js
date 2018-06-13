const SDK = require("plataforma-sdk/worker/sdk");
const executor = require("./business/executorcalculotaxas");

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject, fork) => {
    console.log("Executando o processo de abertura de cenário");
    console.log(context.event);
    try {
        
        resolve();
    } catch (error) {
        console.log("error: " + error.stack);
        reject(error);
    }
});
