const ListarUsinasController = require('../../controllers/listarusinascontroller');

describe('ListarUsinasController deve:', function () {

    it('Listar as usinas', (done) => {
        let listarUsinasController = new ListarUsinasController();
        let promiseUsina = new Promise((resolve) => {
            resolve({idUsina : 'ALUXG'});
        });        
        spyOn(listarUsinasController.usinaMediator, 'listarUsinas').and.returnValue(promiseUsina);

        let response = {
            send(value) {
                expect(value.idUsina).toBe('ALUXG');
                done();
            }
        }
        let request = {};
        listarUsinasController.listarUsinas(request, response);
    });

});



