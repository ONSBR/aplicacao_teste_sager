class CenarioBusiness {

    /**
     * RNI - 202  Alteração da potência para cálculo para um valor menor
     * @param {*} regra 
     * @param {*} evento 
     * @param {*} dataset 
     */
    updatePotencia(regra, eventoToUpdate, dataset) {
        const CINCO_MW = 5;
        let eventos = dataset.eventomudancaestadooperativo.collection.toArray();
        let eventoDB = eventos.find(eventoFilter => {
            return eventoFilter.idEvento == eventoToUpdate.idEvento;
        });

        if (regra.regraPara > eventoDB.potenciaDisponivel && eventoDB.idCondicaoOperativa == 'NOR') {
            eventoToUpdate.potenciaDisponivel = regra.regraPara;
            this.updateCondicaoOperativaEOrigem(eventoToUpdate);
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        } else if (regra.regraPara < eventoDB.potenciaDisponivel) {
            let cincoPorcento = regra.regraPara * 0.05;
            let menorValor = Math.min(CINCO_MW, cincoPorcento);
            let diferencaValores = regra.regraPara - menorValor;

            let indexEventoAnterior = eventos.findIndex(evento => evento.idEvento == eventoDB.idEvento) - 1;
            let eventoAnterior = eventos[indexEventoAnterior];

            if (regra.regraPara > diferencaValores && 
                    !(eventoAnterior.idCondicaoOperativa == 'NOT' || eventoAnterior.idCondicaoOperativa == 'TST')) {
                this.updateCondicaoOperativaEOrigem(eventoToUpdate);
                eventoToUpdate.potenciaDisponivel = regra.regraPara;
                dataset.eventomudancaestadooperativo.update(eventoToUpdate);
            } 
        }

    }

    updateCondicaoOperativaEOrigem(eventoToUpdate) {
        eventoToUpdate.idCondicaoOperativa = 'NOR';
        eventoToUpdate.idClassificacaoOrigem = '';
    }

    /**
     * RNI - 204  Exceção na alteração de classificação de origem.
     * @param {*} evento 
     * @param {*} regra 
     */
    validateClassificacaoOrigem(eventoToUpdate, regra) {
        if(eventoToUpdate.idEstadoOperativo == 'DCA') {
            const classificacoesOrigensPermitidas = ['GOT', 'GGE', 'GUM', 'GCB', 'GTR', 'GAC', 'GAG', 'GCI'];
            if(!classificacoesOrigensPermitidas.includes(regra.regraPara)) {
                throw new Error('Os eventos com Estado Operativo igual a “DCA” só deverão ter sua origem alterada se  a nova origem for “GOT”, “GGE”, “GUM”, “GCB”, “GTR”, “GAC”, “GAG” ou “GCI”.Os eventos com Estado Operativo igual a “DCA” só deverão ter sua origem alterada se  a nova origem for “GOT”, “GGE”, “GUM”, “GCB”, “GTR”, “GAC”, “GAG” ou “GCI”.');
            }
        }
    }

}

module.exports = CenarioBusiness