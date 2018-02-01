describe("Todas as usinas cadastradas devem ser listadas", function () {
    const ListarUsinasController = require('../controllers/ListarUsinasController');
    const listarUsinasController = new ListarUsinasController(); 

    beforeEach(function () {
    });

    it("Todas as usinas cadastradas devem estar listadas no filtro de consulta", function () {
        const usinas = listarUsinasController.listarUsinas();
        expect(usinas).toBeDefined();
    });

});
