const SDK = require("plataforma-sdk/worker/sdk");
const executor = require("./business/executorcalculotaxas");

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject) => {
    
    console.log("Executando o calculo de taxas");
    
    try {
        executor.calcularTaxasPorUsina(context);
        resolve();
    }catch(error) {
        console.log("error: " + error.stack);
        reject(error);
    }
});
