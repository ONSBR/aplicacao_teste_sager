class CriterioEstadoOperativo {

    aplicar(regra, dataset) {
        dataset.estadooperativoevento.collection.toArray().filter(estadoOperativoEvento => {
            return estadoOperativoEvento.idEstadoOperativo == regra.regraDe
        }).forEach(estadoOperativoEventoToUpdate => {
            estadoOperativoEventoToUpdate.idEstadoOperativo = regra.regraPara;
            dataset.estadooperativoevento.update(estadoOperativoEventoToUpdate);
        });
    }

}

module.exports = CriterioEstadoOperativo