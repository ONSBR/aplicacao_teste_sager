const SDK = require("plataforma-sdk/worker/sdk");
const executor = require("./business/executorcalculotaxas");

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject) => {

    console.log("Executando o calculo de taxas individualmente");
    console.log(context.event);

    console.time("timer_process");
    try {
        executor.calcularTaxasPorUsina(context);
        console.timeEnd("timer_process");
        resolve();
    }catch(error) {
        console.log("error: " + error.stack);
        console.timeEnd("timer_process");
        reject(error);
    }
});
