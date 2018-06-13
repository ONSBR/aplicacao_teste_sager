const Criterios = require('../../../process/criterios/criterios');
describe('Critério: ', function () {
    
    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de potência.', () => {
        let regra = {};
        let dataset = {};
        criterios.aplicar(regra, dataset);
    });

});