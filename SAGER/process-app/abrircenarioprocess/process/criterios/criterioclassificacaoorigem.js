class CriterioClassificacaoOrigem {

    aplicar(regra, dataset) {
        dataset.classificacaoorigemevento.collection.toArray().forEach(classificacaoOrigemEventoToUpdate => {
            classificacaoOrigemEventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.classificacaoorigemevento.update(classificacaoOrigemEventoToUpdate);
        });

        dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoToUpdate => {
            return eventoToUpdate.idClassificacaoOrigem == regra.regraDe
        }).forEach(eventoToUpdate => {
            eventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });
    }

}

module.exports = CriterioClassificacaoOrigem