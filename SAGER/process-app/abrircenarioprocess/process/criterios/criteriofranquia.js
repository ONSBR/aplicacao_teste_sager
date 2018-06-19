class CriterioFranquia {

    aplicar(regra, dataset) {
        dataset.unidadegeradora.collection.toArray().filter(unidadegeradora => {
            return unidadegeradora.idUge == regra.regraDe
        }).forEach(unidadegeradoraToUpdate => {
            unidadegeradoraToUpdate.franquia = regra.regraPara;
            dataset.unidadegeradora.update(unidadegeradoraToUpdate);
        });
    }

}

module.exports = CriterioFranquia