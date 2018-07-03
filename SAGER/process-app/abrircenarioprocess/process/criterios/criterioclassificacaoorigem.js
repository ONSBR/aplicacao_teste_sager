class CriterioClassificacaoOrigem {

    aplicar(regra, dataset, payload) {

        console.log('Aplicando critério de classificação de origem');

        dataset.classificacaoorigemevento.collection.toArray().forEach(classificacaoOrigemEventoToUpdate => {
            classificacaoOrigemEventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.classificacaoorigemevento.update(classificacaoOrigemEventoToUpdate);
        });

        dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoToUpdate => {
            return eventoToUpdate.idClassificacaoOrigem == regra.regraDe && (eventoToUpdate.dataVerificada >= payload.dataInicioVigencia && 
                eventoToUpdate.dataVerificada <= payload.dataFimVigencia);
        }).forEach(eventoToUpdate => {
            eventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });
    }

}

module.exports = CriterioClassificacaoOrigem