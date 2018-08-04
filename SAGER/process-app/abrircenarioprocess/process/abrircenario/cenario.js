const Criterios = require('../criterios/criterios');

class Cenario {

    constructor() {
        this.criterios = new Criterios();
    }

    abrir(payload, fork) {
        fork(payload.cenario.nomeCenario, payload.cenario.justificativa);
    }

    aplicarCriterios(context) {
        context.event.payload.cenario.regras.forEach(regra => {
            this.criterios.aplicar(regra, context.dataset);
        });
    }

}

module.exports = Cenario