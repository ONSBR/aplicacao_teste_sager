class CriterioClassificacaoOrigem {

    aplicar(regra, dataset) {
        dataset.eventomudancaestadooperativo.collection.toArray().filter(evento => {
            return evento.idClassificacaoOrigem == regra.regraDe
        }).forEach(eventoToUpdate => {
            eventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });
    }

}

module.exports = CriterioClassificacaoOrigem