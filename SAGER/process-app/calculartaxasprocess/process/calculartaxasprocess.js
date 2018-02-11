const SDK = require("plataforma-sdk/worker/sdk");
const ExecutorCalculoTaxas = require("./business/executorcalculotaxas");

SDK.run((context, resolve, reject, eventManager) => {
    
    console.log("Executando o calculo de taxas");
    
    try {
        if (context.event.payload.idUsina) {
            ExecutorCalculoTaxas.calcularTaxasMensaisPorUsina(context, eventManager);
        } else {
            ExecutorCalculoTaxas.executarCalculoTaxas(context, eventManager);
        }       
        resolve();
    }catch(error) {
        console.log("error: " + error.stack);
        reject(error);
    }
});
