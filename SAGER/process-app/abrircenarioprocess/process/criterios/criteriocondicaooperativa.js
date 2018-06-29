class CriterioCondicaoOperativa {

    aplicar(regra, dataset) {

        console.log('Aplicando critério de condição operativa');

        dataset.condicaooperativaevento.collection.toArray().forEach(condicaoOperativaEventoToUpdate => {
            condicaoOperativaEventoToUpdate.idCondicaoOperativa = regra.regraPara;
            dataset.condicaooperativaevento.update(condicaoOperativaEventoToUpdate);
        });

        dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoToUpdate => {
            return eventoToUpdate.idCondicaoOperativa == regra.regraDe
        }).forEach(eventoToUpdate => {
            eventoToUpdate.idCondicaoOperativa = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });
    }

}

module.exports = CriterioCondicaoOperativa