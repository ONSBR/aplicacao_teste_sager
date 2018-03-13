const UsinaDAO = require('../../dao/usinadao');
const config = require('../../config');

describe('TarefaDAO deve:', function () {
    let tarefaDAO;
    let promise;

    beforeEach(function () {
        usinaDAO = new UsinaDAO();
        promise = new Promise((resolve, reject) => {
            resolve({ id: '1' });
        });

        spyOn(usinaDAO.domainPromiseHelper, 'getDomainPromise').and.returnValue(promise);
    });

    it('Listar todas as usinas:', (done) => {
        usinaDAO.listarUsinas().then(data => {
            expect(data.id).toBe('1');
            expect(tarefaDAO.domainPromiseHelper.getDomainPromise).toHaveBeenCalledWith(config.URL_USINA_SAGER);
            done();
        });
    });

});



