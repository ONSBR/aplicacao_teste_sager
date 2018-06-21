class CriterioCondicaoOperativa {

    aplicar(regra, dataset) {
        dataset.condicaooperativaevento.collection.toArray().filter(condicaoOperativaEvento => {
            return condicaoOperativaEvento.idCondicaoOperativa == regra.regraDe
        }).forEach(condicaoOperativaEventoToUpdate => {
            condicaoOperativaEventoToUpdate.idCondicaoOperativa = regra.regraPara;
            dataset.condicaooperativaevento.update(condicaoOperativaEventoToUpdate);
        });
    }

}

module.exports = CriterioCondicaoOperativa