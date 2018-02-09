const SDK = require("plataforma-sdk/worker/sdk");
const ExecutorCalculoTaxas = require("./business/executorcalculotaxas");

SDK.run((context, resolve, reject, eventManager) => {
    
    console.log("Executando o calculo de taxas");
    
    try {
        if (context.event.payload.idUsina) {
            ExecutorCalculoTaxas.calcularTaxasMensaisPorUsina(context, resolve, reject, eventManager);
        } else {
            ExecutorCalculoTaxas.executarCalculoTaxas(context, resolve, reject, eventManager);
        }       
    }catch(error) {
        console.log("error: " + error.stack);
    }
});
