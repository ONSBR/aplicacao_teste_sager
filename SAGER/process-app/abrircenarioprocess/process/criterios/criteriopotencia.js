class CriterioPotencia {

    aplicar(regra, dataset) {
        dataset.potenciaunidadegeradora.collection.toArray().forEach(potenciaUnidadeGeradoraToUpdate => {
            potenciaUnidadeGeradoraToUpdate.potenciaDisponivel = regra.regraPara;
            dataset.potenciaunidadegeradora.update(potenciaUnidadeGeradoraToUpdate);
        });

        dataset.unidadegeradora.collection.toArray().forEach(unidadeGeradoraToUpdate => {
            unidadeGeradoraToUpdate.potenciaDisponivel = regra.regraPara;
            dataset.unidadegeradora.update(unidadeGeradoraToUpdate);
        });
    }

}

module.exports = CriterioPotencia