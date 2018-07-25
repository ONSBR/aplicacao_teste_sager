const CriterioPotencia = require('./criteriopotencia');
const CriterioClassificacaoOrigem = require('./criterioclassificacaoorigem');
const CriterioEstadoOperativo = require('./criterioestadooperativo');
const CriterioCondicaoOperativa = require('./criteriocondicaooperativa');
const CriterioFranquiaGIC = require('./criteriofranquiagic');
const CriterioFranquiaGMT = require('./criteriofranquiagmt');
const CriterioFranquiaGIM = require('./criteriofranquiagim');
const POTENCIA_DISPONIVEL = 'Potência Disponível';
const CLASSIFICACAO_ORIGEM = 'Classificação de Origem do Evento';
const ESTADO_OPERATIVO = 'Estado Operativo do Evento';
const CONDICAO_OPERATIVA = 'Condição Operativa do Evento';
const FRANQUIA_GIC = 'Franquia GIC';
const FRANQUIA_GMT = 'Franquia GMT';
const FRANQUIA_GIM = 'Franquia GIM';

class Criterios {

    constructor() {
        this.tiposRegras = new Map();
        this.tiposRegras.set(POTENCIA_DISPONIVEL, new CriterioPotencia());  
        this.tiposRegras.set(FRANQUIA_GIC, new CriterioFranquiaGIC());
        this.tiposRegras.set(FRANQUIA_GMT, new CriterioFranquiaGMT());
        this.tiposRegras.set(FRANQUIA_GIM, new CriterioFranquiaGIM());
        this.tiposRegras.set(CLASSIFICACAO_ORIGEM, new CriterioClassificacaoOrigem());
        this.tiposRegras.set(ESTADO_OPERATIVO, new CriterioEstadoOperativo());
        this.tiposRegras.set(CONDICAO_OPERATIVA, new CriterioCondicaoOperativa());
    }

    aplicar(regra, dataset, payload) {
        this.tiposRegras.get(regra.tipoRegra).aplicar(regra, dataset, payload);
    }
}

module.exports = Criterios