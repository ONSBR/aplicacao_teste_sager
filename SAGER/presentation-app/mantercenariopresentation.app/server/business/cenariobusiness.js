const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const Enumerable = require('linq');
const utils = require('../utils');

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
     * @description Altera os dados de um cenário informado
     * @param {Cenario} cenario 
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
            
            if(regrasUpdate && regrasUpdate.length > 0) {
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
            if(!regra.id) {
                context.dataset.regracenario.insert(regra);
            }
        });

        resolve();
    }

    /**
     * @description Inseri o cenário informado
     * @param {Request} request 
     * @param {Response} response 
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

        resolve(listapersist);
    }

    /**
     * @description Exclui um cenário informado
     * @param {Request} request 
     * @param {Response} response 
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
     * @param {string} idCenario
     */
    ativarInativarCenario(context, resolve, reject) {
        context.dataset.cenario.collection.forEach(cenario => {
            if (cenario.situacao == SituacaoCenario.Ativo) {
                cenario.situacao = SituacaoCenario.Inativo;
            } else if (cenario.situacao == SituacaoCenario.Inativo) {
                cenario.situacao = SituacaoCenario.Ativo;
            }
            context.dataset.cenario.update(cenario);
        });
        resolve();
    }
}

module.exports = CenarioBusiness;