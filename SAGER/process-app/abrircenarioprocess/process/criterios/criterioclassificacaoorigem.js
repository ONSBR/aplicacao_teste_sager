const CenarioBusiness = require('./cenariobusiness');
class CriterioClassificacaoOrigem {

    aplicar(regra, dataset, payload) {

        let cenarioBusiness = new CenarioBusiness();

        console.log('Aplicando critério de classificação de origem');

        dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoToUpdate => {
            return eventoToUpdate.idClassificacaoOrigem == regra.regraDe && (eventoToUpdate.dataVerificada >= payload.dataInicioVigencia && 
                eventoToUpdate.dataVerificada <= payload.dataFimVigencia);
        }).forEach(eventoToUpdate => {
            cenarioBusiness.validateClassificacaoOrigem(eventoToUpdate, regra);
            eventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        });

        dataset.classificacaoorigemevento.collection.toArray().forEach(classificacaoOrigemEventoToUpdate => {
            classificacaoOrigemEventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.classificacaoorigemevento.update(classificacaoOrigemEventoToUpdate);
        });

    }

}

module.exports = CriterioClassificacaoOrigem