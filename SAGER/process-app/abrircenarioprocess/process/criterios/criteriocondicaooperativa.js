class CriterioCondicaoOperativa {

    aplicar(regra, dataset) {
        dataset.eventomudancaestadooperativo.collection.filter(evento => {
            return evento.idCondicaoOperativa == regra.regraDe
        }).forEach(eventoToUpdate => {
            eventoToUpdate.idCondicaoOperativa = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });
    }

}

module.exports = CriterioCondicaoOperativa