class AbrirCenario {

    abrir(cenario, fork) {
        fork(cenario.nomeCenario, cenario.justificativa);
    }

}

module.exports = AbrirCenario