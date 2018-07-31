class CenarioBusiness {

    /**
     * RNI202 - Alteração da potência para cálculo para um valor menor
     * RNI203 - Alteração da potência para cálculo para um valor maior
     * @param {*} regra 
     * @param {*} evento 
     * @param {*} dataset 
     */
    updatePotenciaDisponivel(regra, eventoToUpdate, eventos, dataset) {
        const CINCO_MW = 5;
        let eventoDB = this.findByIdEvento(eventos, eventoToUpdate.idEvento);
        if (regra.regraPara > eventoDB.potenciaDisponivel && eventoDB.idCondicaoOperativa == 'NOR') {
            this.updatePotenciaEvento(regra, eventoToUpdate, eventos, dataset);
        } else if (regra.regraPara < eventoDB.potenciaDisponivel) {
            let cincoPorcento = regra.regraPara * 0.05;
            let menorValor = Math.min(CINCO_MW, cincoPorcento);
            let diferencaValores = regra.regraPara - menorValor;

            let indexEventoAnterior = this.findIndexByIdEvento(eventos, eventoDB.idEvento) - 1;
            let eventoAnterior = eventos[indexEventoAnterior];

            if (regra.regraPara > diferencaValores &&
                !(eventoAnterior.idCondicaoOperativa == 'NOT' || eventoAnterior.idCondicaoOperativa == 'TST')) {
                this.updatePotenciaEvento(regra, eventoToUpdate, eventos, dataset);
            }
        }
    }

    findByIdEvento(eventos, idEvento) {
        return eventos.find(eventoFilter => {
            return eventoFilter.idEvento == idEvento;
        });
    }

    findIndexByIdEvento(eventos, idEvento) {
        return eventos.findIndex(evento => evento.idEvento == idEvento)
    }

    updatePotenciaEvento(regra, eventoToUpdate, eventos, dataset) {
        eventoToUpdate.potenciaDisponivel = regra.regraPara;
        this.updateCondicaoOperativaEOrigem(eventoToUpdate);
        dataset.eventomudancaestadooperativo.update(eventoToUpdate);
        this.refletirParaEventoEspelho(eventoToUpdate, eventos, dataset);
    }

    updateCondicaoOperativaEOrigem(eventoToUpdate) {
        eventoToUpdate.idCondicaoOperativa = 'NOR';
        eventoToUpdate.idClassificacaoOrigem = '';
    }

    refletirParaEventoEspelho(eventoToUpdate, eventos, dataset) {
        let indexEvento = this.findIndexByIdEvento(eventos, eventoToUpdate.idEvento);
        let proximoEvento = eventos[indexEvento + 1];
        if (proximoEvento != undefined && eventoToUpdate.dataVerificada != undefined &&
            eventoToUpdate.dataVerificada.getMonth() != proximoEvento.dataVerificada.getMonth() &&
            this.isEventoEspelho(proximoEvento)) {

            proximoEvento.idClassificacaoOrigem = eventoToUpdate.idClassificacaoOrigem;
            proximoEvento.idCondicaoOperativa = eventoToUpdate.idCondicaoOperativa;
            proximoEvento.potenciaDisponivel = eventoToUpdate.potenciaDisponivel;
            dataset.eventomudancaestadooperativo.update(proximoEvento);
        }
    }

    isEventoEspelho(evento) {
        return evento.dataVerificada.getHours() == 0 &&
            evento.dataVerificada.getMinutes() == 0 &&
            evento.dataVerificada.getSeconds() == 0
    }

    /**
     * RNI - 204  Exceção na alteração de classificação de origem.
     * @param {*} evento 
     * @param {*} regra 
     */
    validateClassificacaoOrigem(eventoToUpdate, regra) {
        if (eventoToUpdate.idEstadoOperativo == 'DCA') {
            const classificacoesOrigensPermitidas = ['GOT', 'GGE', 'GUM', 'GCB', 'GTR', 'GAC', 'GAG', 'GCI'];
            if (!classificacoesOrigensPermitidas.includes(regra.regraPara)) {
                throw new Error('Os eventos com Estado Operativo igual a “DCA” só deverão ter sua origem alterada se  a nova origem for “GOT”, “GGE”, “GUM”, “GCB”, “GTR”, “GAC”, “GAG” ou “GCI”.Os eventos com Estado Operativo igual a “DCA” só deverão ter sua origem alterada se  a nova origem for “GOT”, “GGE”, “GUM”, “GCB”, “GTR”, “GAC”, “GAG” ou “GCI”.');
            }
        }
    }

}

module.exports = CenarioBusiness