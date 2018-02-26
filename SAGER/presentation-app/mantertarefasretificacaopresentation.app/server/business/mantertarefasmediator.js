const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class ManterTarefasMediator {

    constructor(domainPromiseHelper) {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    inserirTarefa(nomeTarefa, response) {
        let urlInserirTarefa = config.getUrlInserirTarefa();
        console.log('urlInserirTarefa= ' + urlInserirTarefa);
        let args = this.createArgs(nomeTarefa);
        this.domainPromiseHelper.postDomainPromise(urlInserirTarefa, args).
            then(data => { response.send(data) }).
            catch(e => { console.log(`Erro durante o cadastro de usinas: ${e.toString()}`) });
    }

    createArgs(nomeTarefa) {
        return {
            data:[{
                "nome": nomeTarefa,
                "_metadata": {
                    "type": "tarefaretificacao",
                    "changeTrack": "create",
                    "branch": "master"
                }
            }], headers: { "Content-Type": "application/json" }
        }
    }
}

module.exports = ManterTarefasMediator