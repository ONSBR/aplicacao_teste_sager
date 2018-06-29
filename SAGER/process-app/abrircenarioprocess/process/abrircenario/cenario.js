const Criterios = require('../criterios/criterios');

class Cenario {

    constructor() {
        this.criterios = new Criterios();
    }

    abrir(payload, fork) {
        fork(payload.cenario.nomeCenario, payload.cenario.justificativa);
    }

    aplicarCriterios(payload, dataset) {
        payload.cenario.regras.forEach(regra => {
            this.criterios.aplicar(regra, dataset);
        });
    }

}

module.exports = Cenario