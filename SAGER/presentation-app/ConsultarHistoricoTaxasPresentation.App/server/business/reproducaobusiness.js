const config = require('../config');
const CorePromiseHelper = require('../helpers/corepromisehelper');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const Enumerable = require('linq');

class Comparacao {
    constructor(original, reproducao, tipo_mudanca) {
        this.original = original;
        this.reproducao = reproducao;
        this.tipo_mudanca = tipo_mudanca;
    }
    get comum() {
        return this.original ? this.original : this.reproducao;
    }
}

class ResultadoComparacaoMemoriaCalculoTaxa {

    constructor(contextoOriginal, execucaoOriginal, execucaoReproducao, taxaComparacao, parametrosComparacao, eventosComparacao) {
        this.contextOriginal = contextoOriginal;
        this.execucaoOriginal = execucaoOriginal;
        this.execucaoReproducao = execucaoReproducao;
        this.taxaComparacao = taxaComparacao;
        this.parametrosComparacao = parametrosComparacao;
        this.eventosComparacao = eventosComparacao;
    }
}

class ReproducaoBusiness {

    constructor() {
        this.corePromiseHelper = new CorePromiseHelper();
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    compararMemoriasReproducao(processInstanceOriginalId, processInstanceReproductedId, taxaId) {

        let processMemoryOriginalUrl = config.getProcessMemoryUrl(processInstanceOriginalId);
        let processMemoryReproductedUrl = config.getProcessMemoryUrl(processInstanceReproductedId);

        var processMemoryOriginal = this.domainPromiseHelper.getDomainPromise(processMemoryOriginalUrl);
        var processMemoryReproducted = this.domainPromiseHelper.getDomainPromise(processMemoryReproductedUrl);

        return new Promise((resolve, reject) => {
            Promise.all([processMemoryOriginal, processMemoryReproducted]).then(results => {

                var contextOriginal = results[0];
                var contextReproducted = results[1];

                var resultadoComparacao = this.compararMemoriasCalculoTaxa(contextOriginal, contextReproducted, taxaId);

                resolve(resultadoComparacao);

            }).catch(error => {
                reject(error);
            });
        });

    }

    compararMemoriasCalculoTaxa(contextOriginal, contextReproducao, taxaId) {
        
        // obtenção da reprodução
        var execucaoOriginal = Enumerable.from(contextOriginal.dataset.entities.execucaocalculofechamento).firstOrDefault();
        var execucaoReproducao = Enumerable.from(contextReproducao.dataset.entities.execucaocalculofechamento).firstOrDefault();
        
        return new ResultadoComparacaoMemoriaCalculoTaxa(
            contextOriginal,
            execucaoOriginal, execucaoReproducao,
            this.compararTaxa(contextOriginal, contextReproducao, taxaId),
            this.compararParametros(contextOriginal, contextReproducao),
            this.compararEventos(contextOriginal, contextReproducao)
        );
    }

    listarReproducoes() {
        return this.corePromiseHelper.getCorePromise('reproduction');
    }

    compararTaxa(contextOriginal, contextReproducao, taxaId) {
        console.log('compararTaxa:' + taxaId);
        
        // comparação de taxas
        var taxasOriginal = Enumerable.from(contextOriginal.dataset.entities.taxa);
        var taxaOriginal = taxasOriginal.first(it => { return it.id == taxaId; });

        var taxasReproducao = Enumerable.from(contextReproducao.dataset.entities.taxa);
        var taxaReproducao = taxasReproducao.first(it => {
            return it.idTipoTaxa == taxaOriginal.idTipoTaxa && 
                it.idFechamento == taxaOriginal.idFechamento && 
                it.idUsina == taxaOriginal.idUsina;
        });

        var comparacao = new Comparacao(taxaOriginal);

        if (taxaOriginal.valorTaxa != taxaReproducao.valorTaxa) {
            comparacao.reproducao = taxaReproducao.valorTaxa;
        }

        return comparacao;
    }

    equalsProperties(arg1, arg2, props) {
        var retorno = true;
        props.forEach(prop => {
            if (arg1[prop] != arg2[prop]) {
                retorno = false;
            }
        });
        return retorno;
    }

    compararParametros(contextOriginal, contextReproducao) {
        console.log('compararParametros');

        // comparação de parâmetros
        var parametrosOriginais = Enumerable.from(contextOriginal.dataset.entities.parametrotaxa);
        var parametrosReproducao = Enumerable.from(contextReproducao.dataset.entities.parametrotaxa);

        var propertiesCompare = ['idTipoParametro', 'idUge', 'idFechamento'];

        var comparacoes = [];

        parametrosOriginais.forEach(paramo => {

            var comparacao = new Comparacao(paramo);
            comparacoes.push(comparacao);

            var paramr = parametrosReproducao.firstOrDefault(it => { return this.equalsProperties(it, paramo, propertiesCompare); });

            if (paramo.valorParametro != paramr.valorParametro) {
                comparacao.reproducao = paramr;
            }
        });
        
        parametrosReproducao.forEach(paramr => {
            
            var contemParamo = parametrosOriginais.any(it => { return this.equalsProperties(it, paramr, propertiesCompare); });

            if (!contemParamo) {
                var comparacao = new Comparacao(null, paramr);
                comparacoes.push(comparacao);
            }
        });

        return comparacoes;
    }

    createDiff(arg1, arg2, props) {
        var retorno = {};
        props.forEach(prop => {
            if (arg1[prop] != arg2[prop]) {
                retorno[prop] = arg2[prop];
            }
        });
        return retorno;
    }

    compararEventos(contextOriginal, contextReproducao) {
        console.log('compararEventos');

        // comparação de eventos
        var eventosOriginais = Enumerable.from(contextOriginal.dataset.entities.eventomudancaestadooperativo);
        var eventosReproducao = Enumerable.from(contextReproducao.dataset.entities.eventomudancaestadooperativo);

        var propertiesCompare = ['idUge', 'idClassificacaoOrigem', 'idEstadoOperativo',
            'idCondicaoOperativa', 'dataVerificadaEmSegundos', 'potenciaDisponivel'];

        var comparacoes = [];

        eventosOriginais.forEach(evto => {

            var evtr = eventosReproducao.firstOrDefault(it => { return it.idEvento == evto.idEvento });

            if (evtr == null) {
                comparacoes.push(new Comparacao(evto, null, 'E'));    
            }
            else if (!this.equalsProperties(evto, evtr, propertiesCompare)) {
                comparacoes.push(new Comparacao(evto, this.createDiff(evto, evtr, propertiesCompare), 'A'));
            }
        });

        eventosReproducao.forEach(evtr => {
            
            var contemEvento = eventosOriginais.any(it => { return it.idEvento == evtr.idEvento });

            if (!contemEvento) {
                comparacoes.push(new Comparacao(null, evtr, 'I'));      
            }
        });

        return comparacoes;
    }

}

module.exports = ReproducaoBusiness;