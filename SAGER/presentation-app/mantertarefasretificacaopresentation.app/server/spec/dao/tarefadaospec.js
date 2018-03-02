const TarefaDAO = require('../../dao/tarefadao');

describe('TarefaDAO deve:', function () {

    it('Retornar o payload para inserção de tarefas:', () => {
        let tarefaDAO = new TarefaDAO();
        let payloadInsertTarefa = tarefaDAO.createTarefaRetifcacaoArgs('TAREFA_2');

        expect(payloadInsertTarefa).toEqual({
            data: [{
                "nome": 'TAREFA_2',
                "_metadata": {
                    "type": "tarefaretificacao",
                    "changeTrack": "create",
                    "branch": "master"
                }
            }], headers: { "Content-Type": "application/json" }
        });

    });

    it('Retornar o payload para inserção de eventos de retificação:', () => {
        let tarefaDAO = new TarefaDAO();
        let eventoRetificacao1 = {
            nomeTarefa: 'tarefa1', idEvento: '123', idUsina: 'ALUXG',
            idUge: 'ALUXG-0UG1', idEstadoOperativo: 'EOC', idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GAG',
            potenciaDisponivel: '100', potencia: 500, operacao: 'I'
        };
        let eventoRetificacao2 = {
            nomeTarefa: 'tarefa1', idEvento: '123', idUsina: 'ALUXG',
            idUge: 'ALUXG-0UG2', idEstadoOperativo: 'EOC', idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GAG',
            potenciaDisponivel: '100', potencia: 500, operacao: 'I'
        };
        let payloadInsertEventoRetificacao = tarefaDAO.createInsertEventosRetificacaoArgs([eventoRetificacao1, eventoRetificacao2]);

        expect(payloadInsertEventoRetificacao).toEqual({
            data: [{
                nomeTarefa: 'tarefa1',
                idEvento: '123',
                idUsina: 'ALUXG',
                idUge: 'ALUXG-0UG1',
                idEstadoOperativo: 'EOC',
                idCondicaoOperativa: 'NOR',
                idClassificacaoOrigem: 'GAG',
                potenciaDisponivel: '100',
                operacao: 'I',
                _metadata: {
                    type: 'eventomudancaestadooperativotarefa', changeTrack: 'create', branch: 'master'
                }
            }, {
                nomeTarefa: 'tarefa1',
                idEvento: '123',
                idUsina: 'ALUXG',
                idUge: 'ALUXG-0UG2',
                idEstadoOperativo: 'EOC',
                idCondicaoOperativa: 'NOR',
                idClassificacaoOrigem: 'GAG',
                potenciaDisponivel: '100',
                operacao: 'I',
                _metadata: {
                    type: 'eventomudancaestadooperativotarefa', changeTrack: 'create', branch: 'master'
                }
            }
        ], headers: { "Content-Type": "application/json" }
        });

    });

});



