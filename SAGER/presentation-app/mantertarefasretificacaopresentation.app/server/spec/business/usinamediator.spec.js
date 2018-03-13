const UsinaMediator = require('../../business/usinamediator');

describe('UsinaMediator deve:', function () {

    it('Deve listar as usinas:', () => {
        let usinaMediator = new UsinaMediator();
        spyOn(usinaMediator.usinaDAO, 'listarUsinas').and.callFake(function () {});
        usinaMediator.listarUsinas();
        expect(usinaMediator.usinaDAO.listarUsinas).toHaveBeenCalled();
    });

});



