const SDK = require('plataforma-sdk/worker/sdk');
const Cenario = require('./abrircenario/cenario');
const EventosBusiness = require('eventos_business_rules/business/eventomudancaestadooperativobusiness');

/**
 * EntryPoint de execução do serviço do processApp.
 */
SDK.run((context, resolve, reject, fork) => {
    console.log('Executando o processo de abertura de cenário');
    console.log(context.event);
    try {
        let eventoBusiness = new EventosBusiness();
        let cenario = new Cenario();
        cenario.abrir(context.event.payload, fork);
        cenario.aplicarCriterios(context);

        let eventos = context.dataset.eventomudancaestadooperativo.collection.toArray();

        let uges = new Set(eventos.map(evento => evento.idUge));

        uges.forEach(idUge => {
            let eventosByUge = eventos.filter(eventoByUge => {
                return eventoByUge.idUge == idUge;
            });
            eventosByUge.sort(function (a, b) {
                if (a.dataVerificada < b.dataVerificada)
                    return -1;
                if (a.dataVerificada > b.dataVerificada)
                    return 1;
                return 0;
            });
            eventoBusiness.aplicarRegrasCenario(eventosByUge);
            eventosByUge.filter(eventoToDelete => {
                return eventoToDelete.operacao != undefined && eventoToDelete.operacao == 'E';
            }).forEach(eventoToDelete => {
                context.dataset.eventomudancaestadooperativo.delete(eventoToDelete);
            });
        });
        resolve();
    } catch (error) {
        console.log('error: ' + error.stack);
        reject(error);
    }
});
