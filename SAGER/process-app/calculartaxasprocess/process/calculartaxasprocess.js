const SDK = require("plataforma-sdk/worker/sdk");
const ExecutorCalculoTaxas = require("./business/executorcalculotaxas");

SDK.run((context, resolve, reject) => {
    
    console.log("Executando o calculo de taxas");
    
    try {
        ExecutorCalculoTaxas.executarCalculoTaxas(context, resolve, reject);
    }catch(error) {
        console.log("error: " + error.stack);
    }
});
