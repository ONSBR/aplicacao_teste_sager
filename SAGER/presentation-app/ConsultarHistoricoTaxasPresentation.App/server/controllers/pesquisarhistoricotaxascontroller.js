const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class PesquisarHistoricoTaxasController {

    constructor(domainPromiseHelper) {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    /**
     * @method pesquisarHistorico
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Pesquisa histórico de execuções de calculo.
     */
    pesquisarHistorico(request, response) {
        this.pesquisarFechamentos(request).
            then(fechamentosMensais => { return this.pesquisarTaxas(request, fechamentosMensais); }).
            then(taxas => { return this.pesquisarExecucoesCalculo(taxas); }).
            then(historicoExecucoes => { response.send(historicoExecucoes); }).
            catch(e => { console.log(`Erro durante a consulta de histórico de execuções: ${e.toString()}`) });
    }

    /**
     * @method pesquisarTaxas
     * @param {Request} request Objeto de request
     * @description Pesquisa histórico de taxas por usina, tipo de taxa e ids de fechamento
     */
    pesquisarTaxas(request, fechamentosMensais) {
        let idsFechamentos = this.extrairIdsFechamentos(fechamentosMensais);
        let urlFiltroTaxas = this.getUrlFiltroTaxas(request, idsFechamentos);
        console.log('urlFiltroTaxas:' + urlFiltroTaxas);
        return this.domainPromiseHelper.getDomainPromise(urlFiltroTaxas);
    }

    /**
     * @method pesquisarTaxasAPartirIdFechamento
     * @param {Request} request Objeto de request
     * @param {Response} request Objeto de response
     * @description Pesquisa taxas a partir do id de fechamento
     */
    pesquisarTaxasAPartirIdFechamento(request, response) {
        let idFechamento = request.body.idFechamentoMensal;
        let urlFiltroTaxasAPartirIdFechamento = this.getUrlFiltroTaxasAPartirIdFechamento(idFechamento);
        console.log('urlFiltroTaxasAPartirIdFechamento:' + urlFiltroTaxasAPartirIdFechamento);
        this.domainPromiseHelper.getDomainPromise(urlFiltroTaxasAPartirIdFechamento).
            then(taxas => { response.send(taxas); }).
            catch(e => { console.log(`Erro durante a consulta de histórico de taxas a partir das execuções: ${e.toString()}`) });;
    }

    /**
     * @method pesquisarFechamentoMensalPorId
     * @param {Request} request Objeto de request
     * @param {Response} request Objeto de response
     * @description Pesquisa fechamento mensal por id
     */
    pesquisarFechamentoMensalPorId(request, response) {
        let idFechamento = request.body.idFechamentoMensal;
        let urlFiltroFechamentoMensalPorId = this.getUrlFiltroFechamentoMensalPorId(idFechamento);
        console.log('urlFiltroFechamentoMensalPorId:' + urlFiltroFechamentoMensalPorId);
        this.domainPromiseHelper.getDomainPromise(urlFiltroFechamentoMensalPorId).
            then(fechamentosMensais => { response.send(fechamentosMensais); }).
            catch(e => { console.log(`Erro durante a consulta de fechamento mensal por id: ${e.toString()}`) });;
    }

    getUrlFiltroFechamentoMensalPorId(idFechamento) {
        return config.getUrlFiltroFechamentoMensalPorId(idFechamento);
    }

    getUrlFiltroTaxas(request, idsFechamentos) {
        return config.getUrlFiltroTaxas(this.getUsinaId(request), this.getTipoTaxa(request), idsFechamentos.join(';'))
    }

    pesquisarFechamentos(request) {
        let urlFiltroFechamentosMensais = this.getUrlFiltroFechamentosMensais(request);
        console.log('urlFiltroFechamentosMensais: ' + urlFiltroFechamentosMensais);
        return this.domainPromiseHelper.getDomainPromise(urlFiltroFechamentosMensais);
    }

    getUrlFiltroFechamentosMensais(request) {
        let dataInicial = new Date(this.getDataInicial(request));
        let dataFinal = new Date(this.getDataFinal(request));

        return config.getUrlFiltroFechamentos(dataInicial.getUTCMonth() + 1, dataInicial.getUTCFullYear(),
            dataFinal.getUTCMonth() + 1, dataFinal.getUTCFullYear());
    }

    pesquisarExecucoesCalculo(taxas) {
        let idsFechamentos = this.extrairIdsFechamentosDeTaxas(taxas);
        idsFechamentos = Array.from(this.distinct(idsFechamentos));
        let urlFiltroExecucoesCalculo = this.getUrlFiltroExecucao(idsFechamentos);
        console.log('urlFiltroExecucoesCalculo: ' + urlFiltroExecucoesCalculo);
        return this.domainPromiseHelper.getDomainPromise(urlFiltroExecucoesCalculo);
    }

    extrairIdsFechamentosDeTaxas(taxas) {
        let idsFechamentos = taxas.map(taxa => taxa.idFechamento);
        return idsFechamentos;
    }

    extrairIdsFechamentos(fechamentos) {
        let idsFechamentos = fechamentos.map(fechamento => fechamento.id);
        return idsFechamentos;
    }

    getUrlFiltroExecucao(idsFechamento) {
        return config.getUrlFiltroExecucao(idsFechamento);
    }

    getUrlFiltroTaxasAPartirIdFechamento(idFechamento) {
        return config.getUrlFiltroTaxasAPartirIdFechamento(idFechamento);
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

}

module.exports = PesquisarHistoricoTaxasController