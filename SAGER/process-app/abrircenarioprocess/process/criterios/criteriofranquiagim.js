class CriterioFranquiaGIM {

    aplicar(regra, dataset) {
        console.log('Aplicando critério de franquia');
        
        dataset.unidadegeradora.collection.toArray().filter(unidadegeradora => {
            return unidadegeradora.idUge == regra.regraDe;
        }).forEach(unidadeGeradoraToUpdate => {
            unidadeGeradoraToUpdate.franquiaGIM = regra.regraPara;
            dataset.unidadegeradora.update(unidadeGeradoraToUpdate);
        });
    }

}

module.exports = CriterioFranquiaGIM