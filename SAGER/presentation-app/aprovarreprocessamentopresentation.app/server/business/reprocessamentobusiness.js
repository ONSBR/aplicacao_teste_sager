const config = require('../config');
const DomainPromiseHelper = require('../helper/domainpromisehelper');

class ReprocessamentoBusiness {

    aprovarReprocessamentoPendente(reprocessamentoPendente) {
        return new Promise((resolve, reject) => {
            let url = config.getUrlAprovarReprocessamentoPendente(reprocessamentoPendente.id);
            new DomainPromiseHelper().postDomainPromise(url, { user: "teste" }).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    }

    listarReprocessamentosPendentes() {
        return new Promise((resolve, reject) => {
            let eventosPendentes = [
                {
                    id: "a0575605-83b4-11e8-ac65-0242ac12000f",
                    status: "pending_approval",
                    systemId: "ec498841-59e5-47fd-8075-136d79155705"
                },
                {
                    id: "a7777777-83b4-11e8-ac65-0242ac12000f",
                    status: "pending_approval",
                    systemId: "ec498841-59e5-47fd-8075-136d79155705"
                }
            ];

            this.getPendingEvents().then(pendingEvents => {
                return resolve(eventosPendentes.concat(pendingEvents));
            });
        });
    }

    getPendingEvents() {
        return new DomainPromiseHelper().getDomainPromise(config.URL_PENDING_EVENTS);
    }
}

module.exports = ReprocessamentoBusiness