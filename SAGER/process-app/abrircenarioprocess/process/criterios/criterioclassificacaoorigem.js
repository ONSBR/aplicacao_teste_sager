const CenarioBusiness = require('./cenariobusiness');
const CriterioLogUtil = require('./criteriologutil');
class CriterioClassificacaoOrigem {

    aplicar(regra, dataset) {
        let cenarioBusiness = new CenarioBusiness();

        CriterioLogUtil.log(regra);

        let eventos = dataset.eventomudancaestadooperativo.collection.toArray().filter(evento => {
            return cenarioBusiness.filterByIdEventoAndDataVigencia(evento, regra);
        });

        eventos.forEach(eventoToUpdate => {
            cenarioBusiness.updateClassificacaoOrigem(regra, eventoToUpdate, eventos, dataset);
        });

    }

}

module.exports = CriterioClassificacaoOrigem