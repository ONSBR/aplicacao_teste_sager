class CriterioFranquia {

    aplicar(regra, dataset) {
        
        console.log('Aplicando critério de franquia');
        
        dataset.franquiaunidadegeradora.collection.toArray().forEach(franquiaUnidadeGeradoraToUpdate => {
            franquiaUnidadeGeradoraToUpdate.franquia = regra.regraPara;
            dataset.franquiaunidadegeradora.update(franquiaUnidadeGeradoraToUpdate);
        });

        dataset.unidadegeradora.collection.toArray().forEach(unidadeGeradoraToUpdate => {
            unidadeGeradoraToUpdate.franquia = regra.regraPara;
            dataset.unidadegeradora.update(unidadeGeradoraToUpdate);
        });
    }

}

module.exports = CriterioFranquia