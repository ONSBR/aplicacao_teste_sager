
class Cenario {

    abrir(payload, fork) {
        fork(payload.cenario.nome, payload.cenario.justificativa);
    }

}

module.exports = Cenario