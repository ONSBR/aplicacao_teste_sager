const Regras = require('./regras');

class Cenario {

    constructor() {
        this.regras = new Regras();
    }

    abrir(payload, fork) {
        fork(payload.cenario.nome, payload.cenario.justificativa);
    }

    aplicarCriterios(payload, dataset) {
        payload.cenario.regras.forEach(regra => {
            this.regras.aplicar(regra);
        });
    }

}

module.exports = Cenario