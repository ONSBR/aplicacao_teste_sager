class CenarioBusiness {

    /**
     * RNI202 - Alteração da potência para cálculo para um valor menor
     * RNI203 - Alteração da potência para cálculo para um valor maior
     * @param {*} regra 
     * @param {*} eventoToUpdate 
     * @param {*} eventos
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

            if (regra.regraPara > diferencaValores && eventoAnterior != undefined &&
                !(eventoAnterior.idCondicaoOperativa == 'NOT' || eventoAnterior.idCondicaoOperativa == 'TST')) {
                this.updatePotenciaEvento(regra, eventoToUpdate, eventos, dataset);
            }
        }
    }

    updatePotenciaEvento(regra, eventoToUpdate, eventos, dataset) {
        if(this.isEventoEspelhoEPrimeiroEvento(eventoToUpdate, eventos)) {
            let novoEvento = Object.assign({}, eventoToUpdate);
            novoEvento.potenciaDisponivel = regra.regraPara;
            novoEvento.dataVerificada.setMinutes(1);
            novoEvento.idEvento = this.guid();
            this.updateCondicaoOperativaEOrigem(novoEvento);
            dataset.eventomudancaestadooperativo.insert(novoEvento);
        } else if(!this.isEventoEspelho(eventoToUpdate)){
            eventoToUpdate.potenciaDisponivel = regra.regraPara;
            this.updateCondicaoOperativaEOrigem(eventoToUpdate);
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
            this.refletirParaEventoEspelho(eventoToUpdate, eventos, dataset);
        }
    }

    updateClassificacaoOrigem(regra, eventoToUpdate, eventos, dataset) {
        this.validateClassificacaoOrigem(eventoToUpdate, regra);
        if(this.isEventoEspelhoEPrimeiroEvento(eventoToUpdate, eventos)) {
            let novoEvento = Object.assign({}, eventoToUpdate);
            novoEvento.idClassificacaoOrigem = regra.regraPara;
            novoEvento.dataVerificada.setMinutes(1);
            novoEvento.idEvento = this.guid();
            dataset.eventomudancaestadooperativo.insert(novoEvento);
        } else if(!this.isEventoEspelho(eventoToUpdate)){
            eventoToUpdate.idClassificacaoOrigem = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
            this.refletirParaEventoEspelho(eventoToUpdate, eventos, dataset);
        }
    }
    
    updateEstadoOperativo(regra, eventoToUpdate, eventos, dataset) {
        if(this.isEventoEspelhoEPrimeiroEvento(eventoToUpdate, eventos)) {
            let novoEvento = Object.assign({}, eventoToUpdate);
            novoEvento.idEstadoOperativo = regra.regraPara;
            novoEvento.dataVerificada.setMinutes(1);
            novoEvento.idEvento = this.guid();
            dataset.eventomudancaestadooperativo.insert(novoEvento);
        } else if(!this.isEventoEspelho(eventoToUpdate)){
            eventoToUpdate.idEstadoOperativo = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
            this.refletirParaEventoEspelho(eventoToUpdate, eventos, dataset);
        }
    }

    updateCondicaoOperativa(regra, eventoToUpdate, eventos, dataset) {
        if(this.isEventoEspelhoEPrimeiroEvento(eventoToUpdate, eventos)) {
            let novoEvento = Object.assign({}, eventoToUpdate);
            novoEvento.idCondicaoOperativa = regra.regraPara;
            novoEvento.dataVerificada.setMinutes(1);
            novoEvento.idEvento = this.guid();
            dataset.eventomudancaestadooperativo.insert(novoEvento);
        } else if(!this.isEventoEspelho(eventoToUpdate)){
            eventoToUpdate.idCondicaoOperativa = regra.regraPara;
            dataset.eventomudancaestadooperativo.update(eventoToUpdate);
            this.refletirParaEventoEspelho(eventoToUpdate, eventos, dataset);
        }
    }
    

    isEventoEspelhoEPrimeiroEvento(evento, eventos) {
        return this.findIndexByIdEvento(eventos, evento.idEvento) == 0 && this.isEventoEspelho(evento);
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
        return evento.dataVerificada.getDate() == 1 && 
            evento.dataVerificada.getHours() == 0 &&
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

    findByIdEvento(eventos, idEvento) {
        return eventos.find(eventoFilter => {
            return eventoFilter.idEvento == idEvento;
        });
    }

    findIndexByIdEvento(eventos, idEvento) {
        return eventos.findIndex(evento => evento.idEvento == idEvento)
    }

    filterByIdUgeAndDataVigencia(evento, regra) {
        return (evento.idUge == regra.regraDe && this.filterByDataVigencia(evento, regra));
    }

    filterByIdClassificacaoOrigemAndDataVigencia(evento, regra) {
        return (evento.idClassificacaoOrigem == regra.regraDe && this.filterByDataVigencia(evento, regra));
    }

    filterByIdCondicaoOperativaAndDataVigencia(evento, regra) {
        return (evento.idCondicaoOperativa == regra.regraDe && this.filterByDataVigencia(evento, regra));
    }
    
    filterByIdEstadoOperativoAndDataVigencia(evento, regra) {
        return (evento.idEstadoOperativo == regra.regraDe && this.filterByDataVigencia(evento, regra));
    }

    filterByDataVigencia(evento, regra) {
        return evento.dataVerificada >= regra.dataInicioVigencia && 
            evento.dataVerificada <= regra.dataFimVigencia;
    }



    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}

module.exports = CenarioBusiness