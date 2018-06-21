class CriterioClassificacaoOrigem {

    aplicar(regra, dataset) {
        dataset.classificacaoorigemevento.collection.toArray().filter(classificacaoorigemevento => {
            return classificacaoorigemevento.idClassificacaoOrigem == regra.regraDe
        }).forEach(classificacaoOrigemEventoToUpdate => {
            classificacaoOrigemEventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.classificacaoorigemevento.update(classificacaoOrigemEventoToUpdate);
        });
    }

}

module.exports = CriterioClassificacaoOrigem