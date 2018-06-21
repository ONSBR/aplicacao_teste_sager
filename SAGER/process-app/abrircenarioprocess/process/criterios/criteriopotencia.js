class CriterioPotencia {

    aplicar(regra, dataset) {
        dataset.potenciaunidadegeradora.collection.toArray().forEach(potenciaUnidadeGeradoraToUpdate => {
            potenciaUnidadeGeradoraToUpdate.potenciaDisponivel = regra.regraPara;
            dataset.potenciaunidadegeradora.update(potenciaUnidadeGeradoraToUpdate);
        });
    }

}

module.exports = CriterioPotencia