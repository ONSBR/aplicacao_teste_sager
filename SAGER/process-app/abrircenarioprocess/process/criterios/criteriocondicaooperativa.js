const CriterioLogUtil = require('./criteriologutil');
const CenarioBusiness = require('./cenariobusiness');
class CriterioCondicaoOperativa {

    aplicar(regra, dataset, payload) {
        let cenarioBusiness = new CenarioBusiness();

        CriterioLogUtil.log(regra);

        let eventos = dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoToUpdate => {
            return cenarioBusiness.filterByIdCondicaoOperativaAndDataVigencia(eventoToUpdate, regra);
        })
        
        eventos.forEach(eventoToUpdate => {
            cenarioBusiness.updateCondicaoOperativa(regra, eventoToUpdate, eventos, dataset);
        });
    }

}

module.exports = CriterioCondicaoOperativa