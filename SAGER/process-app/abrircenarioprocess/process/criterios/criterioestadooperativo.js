class CriterioEstadoOperativo {

    aplicar(regra, dataset, payload) {

        console.log('Aplicando critério de estado operativo');

        dataset.estadooperativoevento.collection.toArray().forEach(estadoOperativoEventoToUpdate => {
            estadoOperativoEventoToUpdate.idEstadoOperativo = regra.regraPara;
            dataset.estadooperativoevento.update(estadoOperativoEventoToUpdate);
        });

        dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoToUpdate => {
            return eventoToUpdate.idEstadoOperativo == regra.regraDe && (eventoToUpdate.dataVerificada >= payload.dataInicioVigencia && 
                eventoToUpdate.dataVerificada <= payload.dataFimVigencia);
        }).forEach(eventoToUpdate => {
            eventoToUpdate.idEstadoOperativo = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });
    }

}

module.exports = CriterioEstadoOperativo