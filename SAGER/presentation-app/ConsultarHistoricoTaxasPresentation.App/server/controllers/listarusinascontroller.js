const config = require('../config');
const Client = require('node-rest-client').Client;

class ListarUsinasController {

    /**
     * @method listarUsinas
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todas as usinas cadastradas
     */
    listarUsinas(request, response) {
        let client = this.getClient();
        let listarUsinasReq = client.get(config.URL_USINA_SAGER, function (data) {
            response.send(data);
        });
        listarUsinasReq.on('error', function (err) {
            console.log('request error', err);
        });
    }

    getClient() {
        return new Client();    
    }

}

module.exports = ListarUsinasController