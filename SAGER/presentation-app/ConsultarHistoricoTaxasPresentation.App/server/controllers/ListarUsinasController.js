const config = require('../config');
const Client = require('node-rest-client').Client;

class ListarUsinasController {

    constructor(){
    }

    /**
     * @method listarUsinas
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todas as usinas cadastradas
     */
    listarUsinas(request, response) {
        let client = new Client();
        let listarUsinasReq = client.get(config.urlUsinaSAGER, function (data) {
            response.send(data);
        });
        listarUsinasReq.on('error', function (err) {
            console.log('request error', err);
            response.send('');
        });
    }


}

module.exports = ListarUsinasController