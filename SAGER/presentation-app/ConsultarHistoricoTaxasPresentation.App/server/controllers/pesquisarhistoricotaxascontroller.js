const config = require('../config');
const Client = require('node-rest-client').Client;

class PesquisarHistoricoTaxasController {

    /**
     * @method pesquisarHistorico
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Pesquisa histórico de execuções de calculo.
     */
    pesquisarHistorico(request, response) {
        this.pesquisarTaxas(request).
            then(taxas => { return this.pesquisarFechamentos(request, taxas); }).
            then(fechamentosMensais => { return this.pesquisarExecucoesCalculo(fechamentosMensais); }).
            then(historicoExecucoes => { response.send(historicoExecucoes); }).
            catch(e => { console.log(`Erro durante a consulta de histórico de execuções: ${e.toString()}`) });
    }

    /**
     * @method pesquisarTaxas
     * @param {Request} request Objeto de request
     * @description Pesquisa histórico de taxas por usina, data inicial, data final e tipo de taxa
     */
    pesquisarTaxas(request) {
        let urlFiltroTaxas = this.getUrlFiltroTaxas(request);
        console.log('urlFiltroTaxas:' + urlFiltroTaxas);
        return this.getDomainPromise(urlFiltroTaxas);
    }

    getUrlFiltroTaxas(request) {
        return config.getUrlFiltroTaxas(this.getUsinaId(request), this.getTipoTaxa(request))
    }

    pesquisarFechamentos(request, taxas) {
        let urlFiltroFechamentosMensais = this.getUrlFiltroFechamentosMensais(request, taxas);
        console.log('urlFiltroFechamentosMensais: ' + urlFiltroFechamentosMensais);
        return this.getDomainPromise(urlFiltroFechamentosMensais);
    }

    getUrlFiltroFechamentosMensais(request, taxas) {
        let dataInicial = new Date(this.getDataInicial(request));
        let dataFinal = new Date(this.getDataFinal(request));

        let idsFechamentos = this.extrairIdsFechamentosMensaisFromTaxas(taxas);
        idsFechamentos = Array.from(this.distinct(idsFechamentos));
        return config.getUrlFiltroFechamentos(dataInicial.getUTCMonth() + 1, dataInicial.getUTCFullYear(),
            dataFinal.getUTCMonth() + 1, dataFinal.getUTCFullYear(), idsFechamentos.join(';'));
    }

    pesquisarExecucoesCalculo(fechamentosMensais) {
        console.log('fechamentosMensais ' + fechamentosMensais);
        let idsFechamentos = this.extrairIdsFechamentos(fechamentosMensais);
        idsFechamentos = Array.from(this.distinct(idsFechamentos));
        let urlFiltroExecucoesCalculo = this.getUrlFiltroExecucao(idsFechamentos);
        console.log('urlFiltroExecucoesCalculo: ' + urlFiltroExecucoesCalculo);
        return this.getDomainPromise(urlFiltroExecucoesCalculo);
    }

    extrairIdsFechamentos(fechamentosMensais) {
        let idsFechamentos = fechamentosMensais.map(fechamentosMensais => fechamentosMensais.id);
        return idsFechamentos;
    }

    getUrlFiltroExecucao(idsFechamento) {
        return config.getUrlFiltroExecucao(idsFechamento);
    }

    extrairIdsFechamentosMensaisFromTaxas(taxas) {
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

    getDomainPromise(url) {
        return new Promise((resolve, reject) => {
            let client = new Client();
            let request = client.get(url, function (data) {
                resolve(data);
            });
            request.on('error', function (err) {
                console.log('request error', err);
                reject(err);
            });
        });
    }

}

module.exports = PesquisarHistoricoTaxasController