const TarefaDAO = require('../../dao/tarefadao');
const config = require('../../config');

describe('TarefaDAO deve:', function () {
    let tarefaDAO;
    let promise;

    beforeEach(function () {
        tarefaDAO = new TarefaDAO();
        promise = new Promise((resolve, reject) => {
            resolve({ id: '1' });
        });

        spyOn(tarefaDAO.domainPromiseHelper, 'postDomainPromise').and.returnValue(promise);
        spyOn(tarefaDAO.domainPromiseHelper, 'getDomainPromise').and.returnValue(promise);
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

    it('Modifica o change do track:', () => {
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

    it('Retorna o promise para a inserção de tarefas:', (done) => {
        tarefaDAO.inserirTarefa('teste').then(data => {
            expect(data.id).toBe('1');
            expect(tarefaDAO.domainPromiseHelper.postDomainPromise).toHaveBeenCalled();
            done();
        });

    });

    it('Retorna o promise para a exclusão de tarefas:', (done) => {
        tarefaDAO.excluirTarefa('1', [{_metadata: {}}]).then(data => {
            expect(data.id).toBe('1');
            expect(tarefaDAO.domainPromiseHelper.postDomainPromise).toHaveBeenCalled();
            done();
        });

    });

    it('Retorna o promise para a consulta de eventos por nome de tarefa:', (done) => {
        tarefaDAO.consultarEventosRetificacaoPorNomeTarefa('tarefateste').then(data => {
            expect(data.id).toBe('1');
            expect(tarefaDAO.domainPromiseHelper.getDomainPromise).toHaveBeenCalledWith('http://localhost:2117/mantertarefas/eventomudancaestadooperativotarefa?filter=byNomeTarefa&nometarefa=tarefateste');
            done();
        });
    });

    it('Lista todas as tarefas:', (done) => {
        tarefaDAO.listarTarefas().then(data => {
            expect(data.id).toBe('1');
            expect(tarefaDAO.domainPromiseHelper.getDomainPromise).toHaveBeenCalledWith(config.URL_TAREFAS);
            done();
        });
    });

    it('Insere eventos de retificação:', (done) => {
        tarefaDAO.inserirEventosRetificacao([{id:'1'}, {id:'2'}]).then(data => {
            expect(data.id).toBe('1');
            expect(tarefaDAO.domainPromiseHelper.postDomainPromise).toHaveBeenCalled();
            done();
        });
    });

    

    
});



