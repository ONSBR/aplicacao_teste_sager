const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const Enumerable = require('linq');

const CHANGETRACK_CREATE = "create";
const CHANGETRACK_UPDATE = "update";
const CHANGETRACK_DELETE = "destroy";

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
    alterarCenario(cenario) {

        var urlCenario = config.getUrlFiltroCenarioPorId(cenario.id);
        var urlRegras = config.getUrlFiltroRegrasPorIdCenario(cenario.id);

        var promiseCenario = this.domainPromiseHelper.getDomainPromise(urlCenario);
        var promiseRegras = this.domainPromiseHelper.getDomainPromise(urlRegras);

        var listapersist = [];

        return new Promise((res, rej) => {

            Promise.all([promiseCenario, promiseRegras]).then(results => {

                var cenariosbd = results[0];
                var regrasbd = Enumerable.from(results[1] ? results[1] : []);

                if (validarCenarios(cenariosbd, cenario.id, rej)) {

                    var cenariobd = cenariosbd[0];

                    cenariobd.nomeCenario = cenario.nomeCenario;
                    cenariobd.dataInicioVigencia = cenario.dataInicioVigencia;
                    cenariobd.dataFimVigencia = cenario.dataFimVigencia;
                    cenariobd.justificativa = cenario.justificativa;

                    cenariobd._metadata.changeTrack = CHANGETRACK_UPDATE;
                    listapersist.push(cenariobd);

                    var regrascenario = Enumerable.from(cenario.regras);

                    regrasbd.forEach(regrabd => {

                        var regracenario = regrascenario.firstOrDefault(it => { return it.id == regrabd.id });

                        if (regracenario) {

                            regrabd.nomeRegra = regracenario.nomeRegra;
                            regrabd.regraDe = regracenario.regraDe;
                            regrabd.regraPara = regracenario.regraPara;
                            regrabd.tipoRegra = regracenario.tipoRegra;

                            regrabd._metadata.changeTrack = CHANGETRACK_UPDATE;
                        } else {
                            regrabd._metadata.changeTrack = CHANGETRACK_DELETE;
                        }

                        listapersist.push(regrabd);
                    });

                    regrascenario.forEach(regracenario => {

                        var contem = regrasbd.any(it => { return regracenario.id == it.id });

                        if (!contem) {
                            regracenario._metadata = { changeTrack: CHANGETRACK_CREATE, type: "regracenario" };
                            listapersist.push(regracenario);
                        }
                    });

                    var promiseCenarioUpdate = this.domainPromiseHelper.postDomainPromise(
                        config.URL_CENARIO_SAGER, listapersist);

                    promiseCenarioUpdate.then(result => { res(result) }).catch(
                        error => { catchError(error, 'atualização', cenario.id, rej) }
                    );
                }

            }).catch(error => { catchError(error, 'obtenção', cenario.id, rej) });
        });

    }

    /**
     * @description Inseri o cenário informado
     * @param {Request} request 
     * @param {Response} response 
     */
    inserirCenario(cenario) {

        var listapersist = [];

        cenario._metadata = { changeTrack: CHANGETRACK_CREATE, type: "cenario" };
        listapersist.push(cenario);

        if (cenario.regras && cenario.regras.length > 0) {
            cenario.regras.forEach(it => {
                it._metadata = { changeTrack: CHANGETRACK_CREATE, type: "cenario" };
                listapersist.push(it);
            });
        }

        var promiseCenarioUpdate = this.domainPromiseHelper.postDomainPromise(
            config.URL_CENARIO_SAGER, listapersist);

        promiseCenarioUpdate.catch(error => { catchError(error, 'inclusão', cenario.nomeCenario, rej) });

        return promiseCenarioUpdate;
    }

    /**
     * @description Exclui um cenário informado
     * @param {Request} request 
     * @param {Response} response 
     */
    excluirCenario(idCenario) {

        var urlCenario = config.getUrlFiltroCenarioPorId(idCenario);
        var urlRegras = config.getUrlFiltroRegrasPorIdCenario(idCenario);

        var promiseCenario = this.domainPromiseHelper.getDomainPromise(urlCenario);
        var promiseRegras = this.domainPromiseHelper.getDomainPromise(urlRegras);

        var listapersist = [];

        return new Promise((res, rej) => {
            Promise.all([promiseCenario, promiseRegras]).then(results => {

                var cenariosbd = results[0];
                var regrasbd = Enumerable.from(results[1] ? results[1] : []);

                if (validarCenarios(cenariosbd, idCenario, rej)) {

                    var cenariobd = cenariosbd[0];
                    
                    cenariobd._metadata.changeTrack = CHANGETRACK_DELETE;
                    listapersist.push(cenariobd);

                    regrasbd.forEach(regrabd => {
                        regrabd._metadata.changeTrack = CHANGETRACK_DELETE;
                        listapersist.push(regrabd);
                    });

                    var promiseCenarioUpdate = this.domainPromiseHelper.postDomainPromise(
                        config.URL_CENARIO_SAGER, listapersist);

                    promiseCenarioUpdate.then(result => { res(result) }).catch(
                        error => { catchError(error, 'exclusão', idCenario, rej) }
                    );
                }

            }).catch(error => { catchError(error, 'obtenção', idCenario, rej) });
        });
    }

    /**
     * @description Ativa ou inativa um cenário.
     * @param {string} idCenario
     */
    ativarInativarCenario(idCenario) {

        var urlCenario = config.getUrlFiltroCenarioPorId(idCenario);

        var promiseCenario = this.domainPromiseHelper.getDomainPromise(urlCenario);

        return new Promise((res, rej) => {

            promiseCenario.then(cenariosbd => {

                if (validarCenarios(cenariosbd, idCenario, rej)) {

                    var cenariobd = cenariosbd[0];

                    if (cenariobd.situacao == SituacaoCenario.Ativo) {
                        cenariobd.situacao = SituacaoCenario.Inativo;
                    } else if (cenariobd.situacao == SituacaoCenario.Inativo) {
                        cenariobd.situacao = SituacaoCenario.Ativo;
                    }

                    cenariobd._metadata.changeTrack = CHANGETRACK_UPDATE;

                    var promiseCenarioUpdate = this.domainPromiseHelper.postDomainPromise(
                        config.URL_CENARIO_SAGER, [cenariobd]);

                    promiseCenarioUpdate.then(result => { res(result) }).catch(
                        error => { catchError(error, 'ativação/inativação', idCenario, rej) }
                    );
                }

            }).catch(error => { catchError(error, 'obtenção', idCenario, rej) });
        });
    }
}

function validarCenarios(cenarios, idCenario, reject) {
    if (!cenarios || !cenarios.length || cenarios.length <= 0) {
        var error = new Error(`Erro cenário não encontrado: ${idCenario}`)
        if (reject) {
            reject(error);
            return false;
        } else {
            throw error;
        }
    }
    return true;
}

function catchError(error, msgPart, idCenario, reject) {
    console.log(`Erro ao executar [${msgPart}] do cenário[${idCenario}]: ${error.toString()}`);
    if (reject) {
        reject(error);
    }
}

module.exports = CenarioBusiness;