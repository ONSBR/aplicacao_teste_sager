class CriterioCondicaoOperativa {

    aplicar(regra, dataset) {
        dataset.eventomudancaestadooperativo.collection.filter(evento => {
            return evento.idEstadoOperativo == regra.regraDe
        }).forEach(eventoToUpdate => {
            eventoToUpdate.idEstadoOperativo = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });
    }

}

module.exports = CriterioCondicaoOperativa