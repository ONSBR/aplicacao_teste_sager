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

        if (eventoDB.potenciaDisponivel > regra.regraPara) {
            eventoToUpdate.potenciaDisponivel = regra.regraPara;
            this.updateCondicaoOperativaEOrigem(eventoToUpdate);
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        } else if (eventoDB.potenciaDisponivel < regra.regraPara) {
            let diferencaValores = regra.regraPara - eventoDB.potenciaDisponivel;

            let menorValor = Math.min(CINCO_MW, diferencaValores * 0.05);
            console.log('menorValor=' + menorValor);

            // let eventoAnterior = eventos.findIndex(eventoIndex => );

            if (diferencaValores < menorValor && !(eventoAnterior.idCondicaoOperativa == 'NOT' || eventoAnterior.idCondicaoOperativa == 'TST')) {
                eventoToUpdate.potenciaDisponivel = regra.regraPara;
                this.updateCondicaoOperativaEOrigem(eventoToUpdate);
            }

            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        }

    }

    updateCondicaoOperativaEOrigem(eventoToUpdate) {
        eventoToUpdate.idCondicaoOperativa = 'NOR';
        eventoToUpdate.idClassificacaoOrigem = undefined;
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