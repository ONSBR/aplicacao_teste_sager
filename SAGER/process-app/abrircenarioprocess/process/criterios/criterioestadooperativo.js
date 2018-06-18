class CriterioEstadoOperativo {

    aplicar(regra, dataset) {
        dataset.eventomudancaestadooperativo.collection.toArray().filter(evento => {
            return evento.idEstadoOperativo == regra.regraDe
        }).forEach(eventoToUpdate => {
            eventoToUpdate.idEstadoOperativo = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });
    }

}

module.exports = CriterioEstadoOperativo