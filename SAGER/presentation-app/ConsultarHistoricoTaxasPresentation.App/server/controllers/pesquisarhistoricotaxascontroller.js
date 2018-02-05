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
            let urlFiltroTaxas = this.getUrlFiltroTaxas(request);
            console.log('urlFiltroTaxas:' + urlFiltroTaxas);
            this.getDomain(urlFiltroTaxas);
        });
    }

    getUrlFiltroTaxas(request) {
        return config.getUrlFiltroTaxas(this.getUsinaId(request), this.getTipoTaxa(request))
    }

    pesquisarFechamentos(request, taxas) {
        return new Promise((resolve, reject) => {
            let urlFiltroFechamentosMensais = this.getUrlFiltroFechamentosMensais(request, taxas);
            console.log(urlFiltroFechamentosMensais);
            this.getDomain(urlFiltroFechamentosMensais);
        });
    }

    getUrlFiltroFechamentosMensais(request, taxas) {
        let dataInicial = new Date(this.getDataInicial(request));
        let dataFinal = new Date(this.getDataFinal(request));

        let idsFechamentos = this.extractIdsFechamentosMensaisFromTaxas(taxas);
        idsFechamentos = Array.from(this.distinct(idsFechamentos));
        return config.getUrlFiltroFechamentos(dataInicial.getUTCMonth() + 1, dataInicial.getUTCFullYear(),
            dataFinal.getUTCMonth() + 1, dataFinal.getUTCFullYear(), idsFechamentos.join(';'));
    }

    extractIdsFechamentosMensaisFromTaxas(taxas) {
        let idsFechamentos = taxas.map(taxa => taxa.idFechamento);
        return idsFechamentos;
    }

    distinct(values) {
        return new Set(values).values();
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

    getDomain(url) {
        let client = new Client();
        let request = client.get(url, function (data) {
            resolve(data);
        });
        request.on('error', function (err) {
            console.log('request error', err);
            reject(err);
        });
    }

}

module.exports = PesquisarHistoricoTaxasController