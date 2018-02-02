const config = require('../config');
const Client = require('node-rest-client').Client;

class PesquisarHistoricoTaxasController {

    /**
     * @method pesquisarHistorico
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Pesquisa histórico de taxas por usina, data inicial, data final e tipo de taxa
     */
    pesquisarHistorico(request, response) {
        let taxas;
        let historicoExecucoes;
        this.pesquisarTaxas(request).
            then(taxas => { this.pesquisarFechamentos(request, taxas) });
    }

    pesquisarTaxas(request) {
        return new Promise((resolve, reject) => {
            let client = new Client();
            console.log(config.getUrlFiltroTaxas(this.getUsinaId(request), this.getTipoTaxa(request)));
            let taxasRequest = client.get(config.getUrlFiltroTaxas(this.getUsinaId(request), this.getTipoTaxa(request)),
                function (taxas) {
                    resolve(taxas);
                });
            taxasRequest.on('error', function (err) {
                console.log('request error', err);
                reject(err);
            });
        });
    }

    pesquisarFechamentos(request, taxas) {
        return new Promise((resolve, reject) => {
            let client = new Client();
            let fechamentosRequest = client.get(config.getUrlFiltroTaxas(this.getUsinaId(request), this.getTipoTaxa(request)),
                function (taxas) {
                    resolve(taxas);
                });
            taxasRequest.on('error', function (err) {
                console.log('request error', err);
                reject(err);
            });
        });
    }

    extractIdsFechamentosMensaisFromTaxas(taxas){
        let idsFechamentos = taxas.map(taxa => taxa.idFechamento);
        return idsFechamentos;
    }

    distinct(array) { 
        return new Set(array);
    }

    getUsinaId(request) {
        return request.body.filtroConsulta.usina.id;
    }

    getTipoTaxa(request) {
        return request.body.filtroConsulta.tipoTaxa.id;
    }

    getDataInicial(request) {
        return request.body.filtroConsulta.dataInicial
    }

    getDataFinal(request) {
        return request.body.filtroConsulta.dataFinal;
    }

}

module.exports = PesquisarHistoricoTaxasController