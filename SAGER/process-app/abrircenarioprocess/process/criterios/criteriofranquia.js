class CriterioFranquia {

    aplicar(regra, dataset) {
        dataset.franquiaunidadegeradora.collection.toArray().forEach(franquiaUnidadeGeradoraToUpdate => {
            franquiaUnidadeGeradoraToUpdate.franquia = regra.regraPara;
            dataset.franquiaunidadegeradora.update(franquiaUnidadeGeradoraToUpdate);
        });
    }

}

module.exports = CriterioFranquia