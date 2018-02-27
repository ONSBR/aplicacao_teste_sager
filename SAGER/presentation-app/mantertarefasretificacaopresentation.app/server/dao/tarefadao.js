const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class TarefaDAO {

    constructor(domainPromiseHelper) {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    inserirTarefa(nomeTarefa) {
        let urlInserirTarefa = config.getUrlInserirTarefa();
        console.log('urlInserirTarefa= ' + urlInserirTarefa);
        let args = this.createTarefaRetifcacaoArgs(nomeTarefa);
        return this.domainPromiseHelper.postDomainPromise(urlInserirTarefa, args);
    }

    createTarefaRetifcacaoArgs(nomeTarefa) {
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

    inserirTarefasRetificacaoOperacao(eventosRetificacao) {
        let urlInserirTarefa = config.getUrlInserirTarefa();
        let args = this.createTarefaRetifcacaoOperacaoArgs(eventosRetificacao);
        return this.domainPromiseHelper.postDomainPromise(urlInserirTarefa, this.createTarefaRetifcacaoOperacaoArgs(eventosRetificacao));
    }

    createTarefaRetifcacaoOperacaoArgs(eventosRetificacao) {
        let entities = [];

        eventosRetificacao.forEach(evento => {
            entities.push({
                'idEvento': evento.idEvento,
                'idUge': evento.idUge,
                'idEstadoOperativo': evento.idEstadoOperativo, 
                'idCondicaoOperativa': evento.idCondicaoOperativa,
                'idClassificacaoOrigem': evento.idClassificacaoOrigem,
                'potenciaDisponivel': evento.potenciaDisponivel,
                'operacao': evento.operacao,
                '_metadata': {
                    'type': 'eventomudancaestadooperativotarefa',
                    'changeTrack': 'create',
                    'branch': 'master'
                }
            });
        });

        return {
            data: entities, headers: { "Content-Type": "application/json" }
        }
    }
}

module.exports = TarefaDAO