class CriterioPotencia {

    aplicar(regra, dataset) {
        dataset.unidadegeradora.collection.toArray().filter(unidadegeradora => {
            return unidadegeradora.idUge == regra.regraDe
        }).forEach(unidadeGeradoraToUpdate => {
            unidadeGeradoraToUpdate.potenciaDisponivel = regra.regraPara;
            dataset.unidadegeradora.update(unidadeGeradoraToUpdate);
        });
    }

}

module.exports = CriterioPotencia