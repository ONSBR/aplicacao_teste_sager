const CenarioBusiness = require('./cenariobusiness');
const CriterioLog = require('./criteriolog');
class CriterioPotencia {

    aplicar(regra, dataset) {

        CriterioLog.log(regra);

        let cenarioBusiness = new CenarioBusiness();

        dataset.eventomudancaestadooperativo.collection.toArray().filter(evento => {
            return (evento.idUge == regra.regraDe && 
                evento.dataVerificada >= regra.dataInicioVigencia && 
                evento.dataVerificada <= regra.dataFimVigencia);
        }).forEach(evento=>{
            cenarioBusiness.updatePotencia(regra, evento, dataset);
        });

    }

}

module.exports = CriterioPotencia