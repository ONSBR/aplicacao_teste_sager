const config = require('../config');
const UsinaMediator = require('../business/usinamediator');

class ListarUsinasController {

    constructor() {
        this.usinaMediator = new UsinaMediator();
    }

    /**
     * @method listarUsinas
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todas as usinas cadastradas
     */
    listarUsinas(request, response) {
        this.usinaMediator.listarUsinas().
            then(data => { response.send(data) }).
            catch(e => {
                console.log(`Erro durante a consulta de usinas: ${e.toString()}`);
                response.send(e);
            });
    }

}

module.exports = ListarUsinasController