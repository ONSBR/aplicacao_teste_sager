const config = require('../config');
const Client = require('node-rest-client').Client;

class PesquisarHistoricoTaxasController {

    constructor() {
    }

    /**
     * @method pesquisarHistorico
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Pesquisa histórico de taxas por usina, data inicial, data final e tipo de taxa
     */
    pesquisarHistorico(request, response) {
        let client = new Client();

        let usina = request.body.filtroConsulta.usina.id;
        let dataInicial = request.body.filtroConsulta.dataInicial;
        let dataFinal = request.body.filtroConsulta.dataFinal;
        let tipoTaxa = request.body.filtroConsulta.tipoTaxa;

        let urlFiltroExecucao = config.getUrlFiltroExecucao(dataInicial, dataFinal);

        let listarUsinasReq = client.get(urlFiltroExecucao, function (data) {
            response.send(data);
        });
        listarUsinasReq.on('error', function (err) {
            console.log('request error', err);
            res.send('');
        });
    }

}

module.exports = PesquisarHistoricoTaxasController