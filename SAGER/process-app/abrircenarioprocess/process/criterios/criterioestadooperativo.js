const CenarioBusiness = require('./cenariobusiness');
const CriterioLogUtil = require('./criteriologutil');
class CriterioEstadoOperativo {

    aplicar(regra, dataset) {

        let cenarioBusiness = new CenarioBusiness();

        CriterioLogUtil.log(regra);

        let eventos = dataset.eventomudancaestadooperativo.collection.toArray().filter(eventoToUpdate => {
            return cenarioBusiness.filterByIdEstadoOperativoAndDataVigencia(eventoToUpdate, regra);
        })

        console.log("eventos.count: " + eventos.length);
        
        eventos.forEach(eventoToUpdate => {
            cenarioBusiness.updateEstadoOperativo(regra, eventoToUpdate, eventos, dataset);
        });
    }

}

module.exports = CriterioEstadoOperativo