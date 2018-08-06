const CriterioPotencia = require('./criteriopotencia');
const CriterioClassificacaoOrigem = require('./criterioclassificacaoorigem');
const CriterioEstadoOperativo = require('./criterioestadooperativo');
const CriterioCondicaoOperativa = require('./criteriocondicaooperativa');
const POTENCIA_DISPONIVEL = 'Potência Disponível';
const CLASSIFICACAO_ORIGEM = 'Classificação de Origem do Evento';
const ESTADO_OPERATIVO = 'Estado Operativo do Evento';
const CONDICAO_OPERATIVA = 'Condição Operativa do Evento';

class Criterios {

    constructor() {
        this.tiposRegras = new Map();
        this.tiposRegras.set(POTENCIA_DISPONIVEL, new CriterioPotencia());  
        this.tiposRegras.set(CLASSIFICACAO_ORIGEM, new CriterioClassificacaoOrigem());
        this.tiposRegras.set(ESTADO_OPERATIVO, new CriterioEstadoOperativo());
        this.tiposRegras.set(CONDICAO_OPERATIVA, new CriterioCondicaoOperativa());
    }

    aplicar(regra, dataset) {
        this.tiposRegras.get(regra.tipoRegra).aplicar(regra, dataset);
    }
}

module.exports = Criterios