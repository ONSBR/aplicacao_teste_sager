const ManterTarefasController = require('../../controllers/mantertarefascontroller');

describe('ManterTarefasController deve:', function () {

    it('Inserir tarefa', (done) => {
        let manterTarefasController = new ManterTarefasController();
        let promiseInsert = new Promise((resolve) => {
            resolve({nomeTarefa : 'tarefateste'});
        });  
        spyOn(manterTarefasController.manterTarefasMediator, 'inserirTarefa').and.returnValue(promiseInsert);

        let response = {
            send(value) {
                expect(value.nomeTarefa).toBe('tarefateste');
                done();
            }
        }

        let request = {body:{nomeTarefa:'tarefateste'}};
        manterTarefasController.inserirTarefa(request, response);
    });

});



