const ListarUsinasController = require('../../controllers/listarusinascontroller');

describe('ListarUsinasController deve:', function () {

    it('Listar as usinas', () => {
        let listarUsinasController = new ListarUsinasController();
        let promiseUsina = new Promise((resolve) => {
            resolve({idUsina : 'ALUXG'});
        });        
        spyOn(listarUsinasController.usinaMediator, 'listarUsinas').and.returnValue(promiseUsina);

        let response = {
            send(value) {
            }
        }
        let request = {};
        spyOn(response, 'send');
        listarUsinasController.listarUsinas(request, response);
        expect(response.send).toHaveBeenCalled();
    });
});



