const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const Util = require('../helpers/util');

class TarefaDAO {

    constructor(domainPromiseHelper) {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    inserirTarefa(nomeTarefa) {
        let urlInserirTarefa = config.getUrlInserirTarefa();
        console.log('urlInserirTarefa= ' + urlInserirTarefa);
        let args = this.createTarefaRetificacaoArgs(nomeTarefa);
        return this.domainPromiseHelper.postDomainPromise(urlInserirTarefa, args);
    }

    createTarefaRetificacaoArgs(nomeTarefa) {
        return [{
                "nome": nomeTarefa,
                "_metadata": {
                    "type": "tarefaretificacao",
                    "changeTrack": "create",
                    "branch": "master"
                }
            }];
    }

    excluirTarefa(tarefaId, eventos) {
        let urlExcluirTarefa = config.getUrlInserirTarefa();
        console.log('urlExcluirTarefa= ' + urlExcluirTarefa);
        let args = this.createExcluirTarefaRetificacaoArgs(tarefaId);
        this.modificarChangeTrack(eventos, 'destroy');
        args = args.concat(eventos);
        return this.domainPromiseHelper.postDomainPromise(urlExcluirTarefa, args);
    }

    createExcluirTarefaRetificacaoArgs(tarefaId) {
        return [{
                "id": tarefaId,
                "_metadata": {
                    "type": "tarefaretificacao",
                    "changeTrack": "destroy",
                    "branch": "master"
                }
            }];
        
    }

    modificarChangeTrack(entidades, changeTrack) {
        entidades.forEach(evento => {
            evento._metadata['changeTrack'] = changeTrack;
        });
    }

    listarTarefas() {
        return this.domainPromiseHelper.getDomainPromise(config.URL_TAREFAS);
    }

    consultarEventosRetificacaoPorNomeTarefa(nomeTarefa) {
        let urlConsultarEventosRetificacaoPorNomeTarefa = config.getEventosRetificacaoPorNomeTarefa(nomeTarefa);
        console.log('consultarEventosRetificacaoPorNomeTarefa= ' + urlConsultarEventosRetificacaoPorNomeTarefa);
        return this.domainPromiseHelper.getDomainPromise(urlConsultarEventosRetificacaoPorNomeTarefa);
    }

    inserirEventosRetificacao(eventosRetificacao) {
        let urlInserirTarefa = config.getUrlInserirTarefa();
        let args = this.createInsertEventosRetificacaoArgs(eventosRetificacao);
        return this.domainPromiseHelper.postDomainPromise(urlInserirTarefa, args);
    }

    createInsertEventosRetificacaoArgs(eventosRetificacao) {
        let entities = [];
        eventosRetificacao.forEach(evento => {
            entities.push({
                'nomeTarefa': evento.nomeTarefa,
                'idEvento': evento.idEvento,
                'idUsina': evento.idUsina,
                'idUge': evento.idUge,
                'idEstadoOperativo': evento.idEstadoOperativo,
                'idCondicaoOperativa': evento.idCondicaoOperativa,
                'idClassificacaoOrigem': evento.idClassificacaoOrigem,
                'dataVerificada': Util.stringToDate(evento.dataVerificada, 'DD-MM-YYYY HH:mm:ss'),
                'potenciaDisponivel': evento.potenciaDisponivel,
                'operacao': evento.operacao,
                '_metadata': {
                    'type': 'eventomudancaestadooperativotarefa',
                    'changeTrack': 'create',
                    'branch': 'master'
                }
            });
        });

        return entities;
    }

    obterRetificacaoPorNome(nomeTarefa) {
        let urlRetificacaoPorNomeTarefa = config.getUrlRetificacaoPorNomeTarefa(nomeTarefa);
        console.log('urlRetificacaoPorNomeTarefa=' + urlRetificacaoPorNomeTarefa);
        return this.domainPromiseHelper.getDomainPromise(urlRetificacaoPorNomeTarefa);
    }
}

module.exports = TarefaDAO