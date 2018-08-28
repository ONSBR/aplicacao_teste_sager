const SDK = require('plataforma-sdk/worker/sdk');
const Cenario = require('./abrircenario/cenario');
const CenarioBusiness = require('./criterios/cenariobusiness');
const EventosBusiness = require('eventos_business_rules/business/eventomudancaestadooperativobusiness');

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject, fork) => {
    console.log('Executando o processo de abertura de cenário:');
    console.log(context.event);
    try {
        let cenario = new Cenario();
        let eventosBusiness = new EventosBusiness();
        let payload = context.event.payload;

        cenario.abrir(payload, fork);
        let eventos = context.dataset.eventomudancaestadooperativo.collection.toArray();

        eventos.filter(evento => {
            return evento.dataVerificada >= payload.cenario.dataInicioVigencia && evento.dataVerificada <= payload.cenario.dataFimVigencia;
        }).forEach(evento => {
            context.dataset.eventomudancaestadooperativo.update(evento);                      
        });

        cenario.aplicarCriterios(context);

        let uges = new Set();
        eventos.forEach(evento => {
            uges.add(evento.idUge);
        });

        uges.forEach(idUge => {
            console.log(`Filtrando por UGE:${idUge}`);
            
            let eventosPorUge = context.dataset.eventomudancaestadooperativo.collection.toArray().filter(evento => {
                return evento.idUge == idUge;
            });
            eventosPorUge.sort(CenarioBusiness.sortByData);
            eventosBusiness.aplicarRegrasCenario(eventosPorUge, context.dataset);
        });
        console.log('Sucesso ao executar o processo de abertura de cenário:');
        resolve();
    } catch (error) {
        console.log('error: ' + error.stack);
        reject(error);
    }

});
