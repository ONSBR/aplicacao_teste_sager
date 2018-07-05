class CenarioBusiness {
    
    /**
     * RNI - 202  Alteração da potência para cálculo para um valor menor
     * @param {*} regra 
     * @param {*} evento 
     * @param {*} dataset 
     */
    updatePotencia(regra, eventoToUpdate, dataset) {
        const CINCO_MW =5;
        let eventoDB = dataset.eventomudancaestadooperativo.collection.toArray().find(eventoFilter => {
            return eventoFilter.idEvento == eventoToUpdate.idEvento;
        });
        
        if(regra.regraPara < eventoDB.potenciaDisponivel) {
            eventoToUpdate.potenciaDisponivel = regra.regraPara;
            this.updateCondicaoOperativaEOrigem(eventoToUpdate);
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        } else if(regra.regraPara > eventoDB.potenciaDisponivel) {
            let diferencaValores = regra.regraPara - eventoDB.potenciaDisponivel;
            let menorValor = Math.min(CINCO_MW, diferencaValores * 0.05);
            
            if(diferencaValores < menorValor && !(eventoAnterior.idCondicaoOperativa == 'NOT' || eventoAnterior.idCondicaoOperativa == 'TST')) {
                eventoToUpdate.potenciaDisponivel = regra.regraPara;
                this.updateCondicaoOperativaEOrigem(eventoToUpdate);
            }

            console.log('menorValor='+menorValor);
            
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        }
        
    }

    updateCondicaoOperativaEOrigem(eventoToUpdate) {
        eventoToUpdate.idCondicaoOperativa = 'NOR';
        eventoToUpdate.idClassificacaoOrigem = undefined;
    }

}

module.exports = CenarioBusiness