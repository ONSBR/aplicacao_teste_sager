const Criterios = require('./criterios');

class AplicarCriterios {

    constructor() {
        this.criterios = new Criterios();
    }

    aplicar(context) {
        context.event.payload.cenario.regras.forEach(regra => {
            this.criterios.aplicar(regra, context.dataset, context.event.payload);
        });
    }

}

module.exports = AplicarCriterios