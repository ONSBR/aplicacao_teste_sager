const config = require('../config');
const Client = require('node-rest-client').Client;

class ListarTipoTaxaController {

    /**
     * @method listarTipoTaxa
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Lista todos os tipos de taxa
     */
    listarTipoTaxa(request, response) {
        let client = this.getClient();
        let listarUsinasReq = client.get(config.URL_TIPO_TAXA_SAGER, function (data) {
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

module.exports = ListarTipoTaxaController