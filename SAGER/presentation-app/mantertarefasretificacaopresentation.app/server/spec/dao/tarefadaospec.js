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

    

});



