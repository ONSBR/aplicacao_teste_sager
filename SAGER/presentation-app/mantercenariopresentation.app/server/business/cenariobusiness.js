const SDK = require('plataforma-sdk/worker/sdk');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const EventPromiseHelper = require('../helpers/eventpromisehelper');
const utils = require('../utils');

const SituacaoCenario = {
    Ativo: 'Ativo',
    Incorporado: 'Incorporado',
    Inativo: 'Inativo'
}

/**
 * @description Classe que define as regras de manutenção de cenário.
 */
class CenarioBusiness {

    constructor() {
        this.domainPromiseHelper = new DomainPromiseHelper();
        this.eventPromiseHelper = new EventPromiseHelper();
    }

    /**
     * 
     * @param {context} context 
     * @param {resolve} resolve 
     * @param {reject} reject 
     */
    alterarCenario(context, resolve, reject) {
        let cenario = context.event.payload.cenario;

        context.dataset.cenario.collection.forEach(cenariobd => {
            cenariobd.nomeCenario = cenario.nomeCenario;
            cenariobd.dataInicioVigencia = cenario.dataInicioVigencia;
            cenariobd.dataFimVigencia = cenario.dataFimVigencia;
            cenariobd.justificativa = cenario.justificativa;
            cenariobd.idUsina = cenario.idUsina;
            context.dataset.cenario.update(cenariobd);
        });

        context.dataset.regracenario.collection.forEach(regrabd => {
            let regrasUpdate = cenario.regras.filter(regra => {
                return regra.id == regrabd.id;
            });

            if (regrasUpdate && regrasUpdate.length > 0) {
                regrabd.nomeRegra = regrasUpdate[0].nomeRegra;
                regrabd.regraDe = regrasUpdate[0].regraDe;
                regrabd.regraPara = regrasUpdate[0].regraPara;
                regrabd.tipoRegra = regrasUpdate[0].tipoRegra;
                context.dataset.regracenario.update(regrabd);
            } else {
                context.dataset.regracenario.delete(regrabd);
            }
        });

        cenario.regras.forEach(regra => {
            if (!regra.id) {
                context.dataset.regracenario.insert(regra);
            }
        });

        resolve();
    }

    /**
     * @description Insere o cenário informado
     * @param {context} context 
     * @param {resolve} resolve 
     * @param {reject} reject 
     */
    inserirCenario(context, resolve, reject) {
        var listapersist = [];
        let cenario = context.event.payload.cenario;
        
        if (!cenario.idCenario) {
            cenario.idCenario = utils.guid();
        }

        context.dataset.cenario.insert(cenario);

        if (cenario.regras && cenario.regras.length > 0) {
            cenario.regras.forEach(it => {
                it.idCenario = cenario.idCenario;
                context.dataset.regracenario.insert(it);
                listapersist.push(it);
            });
        }

        resolve();
    }

    createAplicarCriteriosEvent(cenario) {
        cenario._metadata = undefined;
        cenario.id = undefined;
        let event = {
            name: 'aplicar.criterios.cenario',
            payload: { cenario }
        };

        event.payload.dataInicioVigencia = cenario.dataInicioVigencia;
        event.payload.dataFimVigencia = cenario.dataFimVigencia;
        event.payload.idUsina = cenario.idUsina;

        return event;
    }

    /**
     * @description Exclui um cenário informado
     * @param {context} context 
     * @param {resolve} resolve 
     * @param {reject} reject
     */
    excluirCenario(context, resolve, reject) {
        console.log('Excluir cenario='+cenario.nomeCenario);
        context.dataset.cenario.collection.forEach(cenario => {
            context.dataset.cenario.delete(cenario);
            if(cenario.situacao == 'Ativo') {
                SDK.dropgBranch(cenario.nomeCenario);
            }
        });
        context.dataset.regracenario.collection.forEach(regra => {
            context.dataset.regracenario.delete(regra);
        });
        resolve();
    }

    /**
     * @description Ativa ou inativa um cenário.
     * @param {context} context 
     * @param {resolve} resolve 
     * @param {reject} reject
     */
    ativarInativarCenario(context, resolve, reject, fork) {
        let event = undefined;
        context.dataset.cenario.collection.forEach(cenario => {
            if (cenario.situacao == SituacaoCenario.Ativo) {
                this.excluirCenario(context, resolve, reject);
            } else if (cenario.situacao == SituacaoCenario.Inativo) {
                cenario.situacao = SituacaoCenario.Ativo;
                cenario.regras = context.dataset.regracenario.collection.toArray();
                event = this.createAplicarCriteriosEvent(Object.assign({}, cenario));
                context.dataset.cenario.update(cenario);
            }
        });

        if(event) {
            console.log('----- Send aplicar.criterios.cenario event---------');
            console.log(JSON.stringify(event));
            console.log('---------');
            this.eventPromiseHelper.putEventPromise(event).then(resolve()).catch(reject());
        } else {
            resolve();
        }
    }

    /**
     * @description Ativa ou inativa um cenário.
     * @param {context} context 
     * @param {resolve} resolve 
     * @param {reject} reject
     */
    incorporarCenario(context, resolve, reject) {
        context.dataset.cenario.collection.forEach(cenario => {
            cenario.situacao = SituacaoCenario.Incorporado;
            context.dataset.cenario.update(cenario);
            let event = this.createIncorporarCenarioEvent(cenario);
            console.log('----- Send merge.request event---------');
            console.log(event);
            console.log('---------');
            
            this.eventPromiseHelper.putEventPromise(event).then(resolve()).catch(reject());
        });
    }

    createIncorporarCenarioEvent(cenario) {
        let event = {
            name: 'eb60a12f-130d-4b8b-8b0d-a5f94d39cb0b.merge.request',
            payload: {
                branch: cenario.nomeCenario
            }
        };
        return event;
    }
}

module.exports = CenarioBusiness;