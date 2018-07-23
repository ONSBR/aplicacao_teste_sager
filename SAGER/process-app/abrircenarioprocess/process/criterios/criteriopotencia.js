class CriterioPotencia {

    aplicar(regra, dataset) {

        console.log('Aplicando critério de potência');
        
        dataset.potenciaunidadegeradora.collection.toArray().filter(potenciaunidadegeradora => {
            return potenciaunidadegeradora.idUge == regra.regraDe;
        }).forEach(potenciaUnidadeGeradoraToUpdate => {
            potenciaUnidadeGeradoraToUpdate.potenciaDisponivel = regra.regraPara;
            dataset.potenciaunidadegeradora.update(potenciaUnidadeGeradoraToUpdate);
        });

        dataset.unidadegeradora.collection.toArray().filter(unidadegeradora => {
            return unidadegeradora.idUge == regra.regraDe;
        }).forEach(unidadeGeradoraToUpdate => {
            unidadeGeradoraToUpdate.potenciaDisponivel = regra.regraPara;
            dataset.unidadegeradora.update(unidadeGeradoraToUpdate);
        });

        dataset.eventomudancaestadooperativo.collection.toArray().filter(evento => {
            return evento.idUge == regra.regraDe;
        }).forEach(evento=>{
            evento.potenciaDisponivel = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(evento);
        });
    }

}

module.exports = CriterioPotencia