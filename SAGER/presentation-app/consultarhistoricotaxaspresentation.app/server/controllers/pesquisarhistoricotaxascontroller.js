const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const EventPromiseHelper = require('../helpers/eventpromisehelper');
const Lookup = require('plataforma-sdk/ioc/lookup');
const Enumerable = require('linq');

class PesquisarHistoricoTaxasController {

    constructor(domainPromiseHelper) {
        if (!domainPromiseHelper) {
            this.domainPromiseHelper = new DomainPromiseHelper();
        } else {
            this.domainPromiseHelper = domainPromiseHelper;
        }
        //this.eventManager = new Lookup().eventManager;
        //this.eventManager.host = "localhost";
        this.eventPromiseHelper = new EventPromiseHelper();
    }

    /**
     * @method pesquisarHistorico
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Pesquisa histórico de execuções de calculo.
     */
    pesquisarHistorico(request, response) {
        this.pesquisarFechamentos().
            then(fechamentosMensais => {
                return this.pesquisarTaxas(request, this.filtrarFechamentos(request, fechamentosMensais));
            }).
            then(taxas => { return this.pesquisarExecucoesCalculo(taxas); }).
            then(historicoExecucoes => { response.send(historicoExecucoes); }).
            catch(e => { console.log(`Erro durante a consulta de histórico de execuções: ${e.toString()}`) });
    }

    filtrarFechamentos(request, fechamentosMensais) {
        let mesInicial = request.body.filtroConsulta.mesInicial;
        let anoInicial = request.body.filtroConsulta.anoInicial;
        let mesFinal = request.body.filtroConsulta.mesFinal;
        let anoFinal = request.body.filtroConsulta.anoFinal;
        let dataInicial = new Date(anoInicial, mesInicial-1);
        let dataFinal = new Date(anoFinal, mesFinal-1);

        let fechamentosFiltrados = fechamentosMensais.filter(fechamento => {
            let dataFechamento = this.getDataFechamento(fechamento);
            return dataFechamento >= dataInicial && dataFechamento <= dataFinal;
        });

        return fechamentosFiltrados;
    }

    getDataFechamento(fechamento) {
        return new Date(fechamento.ano, fechamento.mes-1);
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
     * @method calcularTaxas
     * @param {Request} request Objeto de request
     * * @param {Response} request Objeto de response
     * @description Solicitar cálculo de taxas
     */
    calcularTaxas(request, response) {
        console.log("Payload: " + JSON.stringify(request.body));
        var evento = {
            name: "calculate.tax.request",
            payload: { mesFechamento: request.body.mesFechamento, anoFechamento: request.body.anoFechamento },
            owner: request.body.presentationId
        };

        //return this.eventManager.emit(evento).then(res => {response.send(res)});
        return this.eventPromiseHelper.putEventPromise(evento).then(res => { response.send(res) });
    }


    /**
     * @method pesquisarTaxasAPartirIdFechamento
     * @param {Request} request Objeto de request
     * @param {Response} request Objeto de response
     * @description Pesquisa taxas a partir do id de fechamento
     */
    pesquisarTaxasAPartirIdFechamento(request, response) {
        let idFechamento = request.body.idFechamentoMensal;
        let filtroConsulta = request.body.filtroConsulta;

        let urlFiltroTaxas = this.getUrlFiltroTaxasPorUsinaTipoTaxaIdsFechamentos(
            filtroConsulta.usina.idUsina, filtroConsulta.tipoTaxa.idTipoTaxa, [idFechamento]);

        console.log('getUrlFiltroTaxas:' + urlFiltroTaxas);
        this.domainPromiseHelper.getDomainPromise(urlFiltroTaxas).then(taxas => { 
            
            var taxa = taxas && taxas.length > 0?taxas[0]:null;
            if (taxa) {
                var urlTaxaHistory = config.getUrlTaxaHistory(taxa.id);
                console.log('urlTaxaHistory: ' + urlTaxaHistory);
                this.domainPromiseHelper.getDomainPromise(urlTaxaHistory).then(taxasHistory => { 
                    if (taxasHistory && taxasHistory.length) {
                        taxasHistory.forEach(it => {
                            it.id = taxa.id;
                        });
                    }
                    response.send(taxasHistory); 
                });
            } else {
                throw new Error("Erro ao obter taxas ");
            }
        }).catch(e => { 
            console.log(`Erro durante a consulta de histórico de taxas a partir das execuções: ${e.toString()}`); 
            response.statusCode = 400;
            response.send(e);
        });
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

    getUrlFiltroTaxasPorUsinaTipoTaxaIdsFechamentos(usinaId, tipoTaxaId, idsFechamentos) {
        return config.getUrlFiltroTaxas(usinaId, tipoTaxaId, idsFechamentos.join(';'))
    }

    pesquisarFechamentos() {
        let urlFiltroFechamentosMensais = this.getUrlFiltroFechamentosMensais();
        console.log('urlFiltroFechamentosMensais: ' + urlFiltroFechamentosMensais);
        return this.domainPromiseHelper.getDomainPromise(urlFiltroFechamentosMensais);
    }

    getUrlFiltroFechamentosMensais() {
        return config.getUrlFiltroFechamentos();
    }

    pesquisarExecucoesCalculo(taxas) {
        let idsFechamentos = this.extrairIdsFechamentosDeTaxas(taxas);
        idsFechamentos = Array.from(this.distinct(idsFechamentos));
        let urlFiltroExecucoesCalculo = this.getUrlFiltroExecucao(idsFechamentos.join(";"));
        console.log('urlFiltroExecucoesCalculo: ' + urlFiltroExecucoesCalculo);
        return this.domainPromiseHelper.getDomainPromise(urlFiltroExecucoesCalculo);
    }

    listarBusinessEvents(request, response, next) {

        var filters = {};

        var horas = request.query.horas;
        var qtd = request.query.qtd;

        filters["last"] = horas ? horas+"h": "1h";

        var url = config.getUrlFiltroEvents(filters);

        this.domainPromiseHelper.getDomainPromise(url).then(result => {
            
            var retorno = [];
            if (result && result.result && result.result.length > 0) {

                var eventos = Enumerable.from(result.result);
                retorno = eventos.where(it => { return it.name.startsWith("calculate.tax.") }).toArray();
            }

            response.send(retorno);
        }).catch(e => { 
            console.log(`Erro durante a consulta de eventos de negócio: ${e.toString()}`); 
            response.statusCode = 400;
            if (next) next(e);
        });
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
        return request.body.filtroConsulta.usina.idUsina;
    }

    getTipoTaxa(request) {
        return request.body.filtroConsulta.tipoTaxa.idTipoTaxa;
    }

}

module.exports = PesquisarHistoricoTaxasController