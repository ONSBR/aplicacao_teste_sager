class CriterioFranquia {

    aplicar(regra, dataset) {
        console.log('Aplicando critério de franquia');
        
        dataset.franquiaunidadegeradora.collection.toArray().filter(franquiaunidadegeradora => {
            return franquiaunidadegeradora.idUge == regra.regraDe;
        }).forEach(franquiaUnidadeGeradoraToUpdate => {
            franquiaUnidadeGeradoraToUpdate.franquia = regra.regraPara;
            dataset.franquiaunidadegeradora.update(franquiaUnidadeGeradoraToUpdate);
        });

        dataset.unidadegeradora.collection.toArray().filter(unidadegeradora => {
            return unidadegeradora.idUge == regra.regraDe;
        }).forEach(unidadeGeradoraToUpdate => {
            unidadeGeradoraToUpdate.franquia = regra.regraPara;
            dataset.unidadegeradora.update(unidadeGeradoraToUpdate);
        });
    }

}

module.exports = CriterioFranquia