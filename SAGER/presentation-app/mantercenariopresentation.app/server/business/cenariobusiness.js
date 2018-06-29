const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const utils = require('../utils');
const eventPromiseHelper = new (require('../helpers/eventpromisehelper'))();

const CHANGETRACK_UPDATE = "update";

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
    }

    createAplicarCriteriosEvent(cenario) {
        let event = {
            name: 'aplicar.criterios.cenario',
            payload: { cenario }
        };

        event.payload.dataInicioVigencia = cenario.dataInicioVigencia;
        event.payload.dataFimVigencia = cenario.dataFimVigencia;
        event.payload.idUsina = cenario.idUsina;
        this.populateUge(cenario.regras, event);
        this.populateEventoData(cenario.regras, event);

        return event;
    }

    populateUge(regras, event) {
        regras.forEach(regra => {
            if (this.isRegraFranquia(regra) || this.isRegraPotenciaDisponivel(regra)) {
                event.payload.idUge = regra.regraDe;
            }
        });
    }

    populateEventoData(regras, event) {
        regras.forEach(regra => {

            if (this.isRegraClassificacao(regra)) {
                event.payload.classificacao = regra.regraDe;
            }

            if (this.isRegraCondicaoOperativa(regra)) {
                event.payload.condicaoOperativa = regra.regraDe;
            }

            if (this.isRegraEstadoOperativo(regra)) {
                event.payload.estadoOperativo = regra.regraDe;
            }
        });
    }

    isRegraFranquia(regra) {
        return regra.tipoRegra == 'Franquia';
    }

    isRegraPotenciaDisponivel(regra) {
        return regra.tipoRegra == 'Potência Disponível';
    }

    isRegraClassificacao(regra) {
        return regra.tipoRegra == 'Classificação de Origem do Evento';
    }

    isRegraCondicaoOperativa(regra) {
        return regra.tipoRegra == 'Condição Operativa do Evento';
    }

    isRegraEstadoOperativo(regra) {
        return regra.tipoRegra == 'Estado Operativo do Evento';
    }

    /**
     * @description Exclui um cenário informado
     * @param {context} context 
     * @param {resolve} resolve 
     * @param {reject} reject
     */
    excluirCenario(context, resolve, reject) {
        context.dataset.cenario.collection.forEach(cenario => {
            context.dataset.cenario.delete(cenario);
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
    ativarInativarCenario(context, resolve, reject) {
        let event = null;
        context.dataset.cenario.collection.forEach(cenario => {
            if (cenario.situacao == SituacaoCenario.Ativo) {
                cenario.situacao = SituacaoCenario.Inativo;
                let event = this.createAplicarCriteriosEvent(cenario);
                console.log('----- Send aplicar.criterios.cenario event---------');
                console.log(event);
                console.log('---------');
                eventPromiseHelper.putEventPromise(event).then(resolve(cenario)).catch(reject());

            } else if (cenario.situacao == SituacaoCenario.Inativo) {
                cenario.situacao = SituacaoCenario.Ativo;
            }

            context.dataset.cenario.update(cenario);
        });
        resolve();
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
            eventPromiseHelper.putEventPromise(event).then(resolve()).catch(reject());
        });
    }

    createIncorporarCenarioEvent(cenario) {
        let event = {
            name: "eb60a12f-130d-4b8b-8b0d-a5f94d39cb0b.merge.request",
            payload: {
                branch: cenario.nomeCenario
            }
        };
        return event;
    }
}

module.exports = CenarioBusiness;