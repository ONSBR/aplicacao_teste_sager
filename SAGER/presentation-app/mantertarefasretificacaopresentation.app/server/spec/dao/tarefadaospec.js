const TarefaDAO = require('../../dao/tarefadao');

describe('TarefaDAO deve:', function () {
    let tarefaDAO;

    beforeEach(function () {
        tarefaDAO = new TarefaDAO();
    });

    it('Retornar o payload para inserção de tarefas:', () => {
        let payloadInsertTarefa = tarefaDAO.createTarefaRetificacaoArgs('TAREFA_2');

        expect(payloadInsertTarefa).toEqual({
            data: [{
                'nome': 'TAREFA_2',
                '_metadata': {
                    'type': 'tarefaretificacao',
                    'changeTrack': 'create',
                    'branch': 'master'
                }
            }], headers: { 'Content-Type': 'application/json' }
        });

    });

    it('Retornar o payload para inserção de eventos de retificação:', () => {
        let eventoRetificacao1 = {
            nomeTarefa: 'tarefa1', idEvento: '123', idUsina: 'ALUXG',
            idUge: 'ALUXG-0UG1', idEstadoOperativo: 'EOC', idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GAG',
            potenciaDisponivel: '100', potencia: 500, operacao: 'I', dataVerificada: '01-08-1997 02:00:00'
        };
        let eventoRetificacao2 = {
            nomeTarefa: 'tarefa1', idEvento: '123', idUsina: 'ALUXG',
            idUge: 'ALUXG-0UG2', idEstadoOperativo: 'EOC', idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GAG',
            potenciaDisponivel: '100', potencia: 500, operacao: 'I', dataVerificada: '02-08-1997 02:00:00'
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
                dataVerificada: '1997-08-01T02:00:00-03:00',
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
                dataVerificada: '1997-08-02T02:00:00-03:00',
                potenciaDisponivel: '100',
                operacao: 'I',
                _metadata: {
                    type: 'eventomudancaestadooperativotarefa', changeTrack: 'create', branch: 'master'
                }
            }
            ], headers: { 'Content-Type': 'application/json' }
        });

    });

    it('Retornar o payload para inserção de eventos de retificação:', () => {
        let eventoRetificacao1 = {
            nomeTarefa: 'tarefa1', idEvento: '123', idUsina: 'ALUXG',
            idUge: 'ALUXG-0UG1', idEstadoOperativo: 'EOC', idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GAG',
            potenciaDisponivel: '100', potencia: 500, operacao: 'I', dataVerificada: '01-08-1997 02:00:00'
        };
        let eventoRetificacao2 = {
            nomeTarefa: 'tarefa1', idEvento: '123', idUsina: 'ALUXG',
            idUge: 'ALUXG-0UG2', idEstadoOperativo: 'EOC', idCondicaoOperativa: 'NOR', idClassificacaoOrigem: 'GAG',
            potenciaDisponivel: '100', potencia: 500, operacao: 'I', dataVerificada: '02-08-1997 02:00:00'
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
                dataVerificada: '1997-08-01T02:00:00-03:00',
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
                dataVerificada: '1997-08-02T02:00:00-03:00',
                potenciaDisponivel: '100',
                operacao: 'I',
                _metadata: {
                    type: 'eventomudancaestadooperativotarefa', changeTrack: 'create', branch: 'master'
                }
            }
            ], headers: { 'Content-Type': 'application/json' }
        });

    });


    it('Retornar o payload para exclusão de tarefas:', () => {
        let payloadDeleteTarefaRetificacao = tarefaDAO.createExcluirTarefaRetificacaoArgs('d1223476-3f46-496a-9b89-7ffaf0fff580');

        expect(payloadDeleteTarefaRetificacao).toEqual({
            data: [{
                id: 'd1223476-3f46-496a-9b89-7ffaf0fff580',
                _metadata: {
                    type: 'tarefaretificacao', changeTrack: 'destroy', branch: 'master'
                }
            }
            ], headers: { 'Content-Type': 'application/json' }
        });

    });

    it('Retornar o payload para exclusão de tarefas:', () => {
        let entidades = [
            {
                '_metadata': {
                    'branch': 'master',
                    'type': 'tarefa'
                },
            },
            {
                '_metadata': {
                    'branch': 'master',
                    'type': 'tarefa'
                },
            }];

        tarefaDAO.modificarChangeTrack(entidades, 'destroy');
        expect(entidades).toEqual([{
            '_metadata': {
                'branch': 'master',
                'type': 'tarefa',
                'changeTrack': 'destroy'
            },
        },
            {
                '_metadata': {
                    'branch': 'master',
                    'type': 'tarefa',
                    'changeTrack': 'destroy'
                },
            }]);
    });

});



