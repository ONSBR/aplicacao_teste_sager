const CenarioBusiness = require('./cenariobusiness');
const CriterioLog = require('./criteriolog');
class CriterioPotencia {

    aplicar(regra, dataset) {

        CriterioLog.log(regra);

        let cenarioBusiness = new CenarioBusiness();

        let eventos = dataset.eventomudancaestadooperativo.collection.toArray().filter(evento => {
            return (evento.idUge == regra.regraDe && 
                evento.dataVerificada >= regra.dataInicioVigencia && 
                evento.dataVerificada <= regra.dataFimVigencia);
        });
        eventos.forEach(evento=>{
            cenarioBusiness.updatePotenciaDisponivel(regra, evento, eventos, dataset);
        });

    }

}

module.exports = CriterioPotencia