const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class TarefaDAO {

    constructor(domainPromiseHelper) {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    inserirTarefa(nomeTarefa) {
        let urlInserirTarefa = config.getUrlInserirTarefa();
        console.log('urlInserirTarefa= ' + urlInserirTarefa);
        let args = this.createArgs(nomeTarefa);
        return this.domainPromiseHelper.postDomainPromise(urlInserirTarefa, args);
    }

    createArgs(nomeTarefa) {
        return {
            data: [{
                "nome": nomeTarefa,
                "_metadata": {
                    "type": "tarefaretificacao",
                    "changeTrack": "create",
                    "branch": "master"
                }
            }], headers: { "Content-Type": "application/json" }
        }
    }

    listarTarefas() {
        return this.domainPromiseHelper.getDomainPromise(config.URL_TAREFAS);
    }
}

module.exports = TarefaDAO