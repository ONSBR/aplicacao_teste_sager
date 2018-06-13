const CriterioPotencia = require('../criterios/criteriopotencia');
const POTENCIA_DISPONIVEL = 'Potência Disponível';

class Criterios {

    constructor() {
        this.tiposRegras = new Map();
        this.tiposRegras.set(POTENCIA_DISPONIVEL, new CriterioPotencia());  
    }

    aplicar(regra, dataset) {
        this.tiposRegras.get(regra.tipoRegra).aplicar(regra, dataset);
    }
}

module.exports = Criterios