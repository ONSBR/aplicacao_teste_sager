class CriterioFranquia {

    aplicar(regra, dataset) {
        dataset.usina.collection.filter(usina => {
            return usina.idUsina == regra.regraDe
        }).forEach(usinaToUpdate => {
            usinaToUpdate.franquia = regra.regraPara;
            dataset.usina.update(usinaToUpdate);
        });
    }

}

module.exports = CriterioFranquia