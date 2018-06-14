const CriterioPotencia = require('../criterios/criteriopotencia');
const CriterioClassificacaoOrigem = require('../criterios/criterioclassificacaoorigem');
const POTENCIA_DISPONIVEL = 'Potência Disponível';
const CLASSIFICACAO_ORIGEM = 'Classificação de Origem do Evento';

class Criterios {

    constructor() {
        this.tiposRegras = new Map();
        this.tiposRegras.set(POTENCIA_DISPONIVEL, new CriterioPotencia());  
        this.tiposRegras.set(CLASSIFICACAO_ORIGEM, new CriterioClassificacaoOrigem());
    }

    aplicar(regra, dataset) {
        this.tiposRegras.get(regra.tipoRegra).aplicar(regra, dataset);
    }
}

module.exports = Criterios