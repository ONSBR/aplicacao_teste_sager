class EventoMudancaEstadoOperativoBusiness {

    /**
     * RNI080 - Entrada em Operação Comercial de um equipamento. 
     * É obrigatória a existência de um, e somente um, evento com o estado operativo EOC para 
     * indicar a entrada em operação comercial de um equipamento.
     * @param {EventoMudancaEstadoOperativo[]} eventosMudancasEstadosOperativos - array de eventos.
     */
    verificarUnicidadeEventoEntradaOperacaoComercial(eventosMudancasEstadosOperativos) {
        let countEventosEOC = 0;
        let tempoEmSegundosEOC;
        let encontrouEventoSimultaneoAoEOC = false;

        eventosMudancasEstadosOperativos.forEach(evento => {
            // FIXME constantes
            if (evento.idEstadoOperativo == 'EOC') {
                countEventosEOC++;
                tempoEmSegundosEOC = evento.dataVerificadaEmSegundos;
            }

            if (evento.idEstadoOperativo != 'EOC' && tempoEmSegundosEOC != undefined &&
                evento.dataVerificadaEmSegundos == tempoEmSegundosEOC) {
                encontrouEventoSimultaneoAoEOC = true;
            }
        });

        return countEventosEOC == 1 && encontrouEventoSimultaneoAoEOC;
    }

    /**
     * RNH132 - Campo Disponibilidade vazio. 
     * A Disponibilidade dos eventos com Condição Operativa “NOR”, “NOT” e “TST” 
     * será sempre preenchida pelo sistema com a potência vigente na data verificada do evento.
     * A Disponibilidade dos eventos de com Estado Operativo de desligamento (exceto DCO) será 
     * sempre preenchida pelo sistema com zero.
     * @param {EventoMudancaEstadoOperativo} evento - Evento de mudança de estado operativo.
     */
    preencherCampoDisponibilidadeVazio(evento, uge) {
        if (!evento.potenciaDisponivel) {

            const NOR_NOT_TST = ['NOR', 'NOT', 'TST'];
            const ESTADOS_OPERATIVOS_DESLIGADO_EXCETO_DCO = ['DEM', 'DUR', 'DAU', 'DCA', 'DPR', 'DPA', 'DAP', 'DES', 'DOM'];
            if (NOR_NOT_TST.includes(evento.idCondicaoOperativa)) {
                evento.potenciaDisponivel = uge.potenciaDisponivel;
            } else if (ESTADOS_OPERATIVOS_DESLIGADO_EXCETO_DCO.includes(evento.idEstadoOperativo)) {
                evento.potenciaDisponivel = 0;
            } else {
                evento.potenciaDisponivel = uge.potenciaDisponivel;
            }
        }
    }

    /**
     * RNI083 - Evento DCO após LIG. 
     * Um evento de Mudança de Estado Operativo com Estado Operativo “DCO” posterior a um evento com 
     * Estado Operativo “LIG” e Condição Operativa “RFO” ou “RPR” deve ter a mesma Condição Operativa, 
     * origem e valor de Disponibilidade do evento predecessor, exceto se for Origem “GRE”.
     * @param {EventoMudancaEstadoOperativo[]} eventosMudancasEstadosOperativos - array de eventos.
     */
    verificarEventoDCOAposLig(eventos) {
        if (eventos.length > 1) {
            for (let i = 1; i < eventos.length; i++) {
                return this.compararEventos(eventos[i - 1], eventos[i]);
            }
        } else {
            return true;
        }
    }

    compararEventos(eventoAnterior, evento) {
        if (eventoAnterior.idEstadoOperativo == 'LIG' && (eventoAnterior.idCondicaoOperativa == 'RFO' || eventoAnterior.idCondicaoOperativa == 'RPR')
            && eventoAnterior.idClassificacaoOrigem != 'GRE' && evento.idEstadoOperativo == 'DCO') {
            return (eventoAnterior.idCondicaoOperativa == evento.idCondicaoOperativa) &&
                (eventoAnterior.idClassificacaoOrigem == evento.idClassificacaoOrigem) &&
                (eventoAnterior.potenciaDisponivel == evento.potenciaDisponivel)
        } else {
            return true;
        }
    }

    /**
     * RNH064 - Reflexão de alteração de último evento em evento espelho
     * @param {EventoMudancaEstadoOperativo[]} eventosMudancasEstadosOperativos - array de eventos.
     */
    refletirAlteracaoDeUltimoEventoEmEventoespelho(eventos) {
        for (let i = 0; i < eventos.length; i++) {
            if (this.isEventoAlteracao(eventos[i]) && this.isUltimoEventoMes(eventos[i], eventos[i + 1])) {
                this.refletirAlteracoesParaEventosEspelhos(eventos[i], eventos, i + 1);
            }
        }
    }

    refletirAlteracoesParaEventosEspelhos(eventoAlterado, eventos, indicePosteriorEventoAlterado) {
        for (let i = indicePosteriorEventoAlterado; i < eventos.length; i++) {
            if (this.isEventoEspelho(eventos[i], eventos[i - 1])) {
                eventos[i].idClassificacaoOrigem = eventoAlterado.idClassificacaoOrigem;
                eventos[i].idEstadoOperativo = eventoAlterado.idEstadoOperativo;
                eventos[i].idCondicaoOperativa = eventoAlterado.idCondicaoOperativa;
                eventos[i].potenciaDisponivel = eventoAlterado.potenciaDisponivel;
            }
        }
    }

    isEventoEspelho(evento, eventoAnterior) {
        return eventoAnterior != undefined &&
            eventoAnterior.dataVerificada.getMonth() != evento.dataVerificada.getMonth() &&
            evento.dataVerificada.getDate() == 1 && evento.dataVerificada.getHours() == 0 && evento.dataVerificada.getMinutes() == 0;
    }

    isEventoAlteracao(evento) {
        return evento.operacao != undefined && evento.operacao == 'A';
    }

    isUltimoEventoMes(evento, eventoPosterior) {
        return eventoPosterior != undefined &&
            evento.dataVerificada.getMonth() != eventoPosterior.dataVerificada.getMonth();
    }
    /**
     * RNI095 - Exclusão do evento origem do "Evento-Espelho"
     * Caso o evento origem do"Evento-Espelho" seja excluído, ele passará a acompanhar as alterações do ‘novo’ último evento do mês anterior.
     * @param {EventoMudancaEstadoOperativo[]} eventosMudancasEstadosOperativos - array de eventos.
     */
    refletirAlteracoesQuandoUltimoEventoMesExcluido(eventos) { 
        for (let i = 0; i < eventos.length; i++) {
            if(this.isEventoExclusao(eventos[i]) && this.isUltimoEventoMes(eventos[i], eventos[i + 1])) {
                this.refletirAlteracoesParaEventosEspelhos(eventos[i-1], eventos, i + 1);
            }
        }
    }

    isEventoExclusao(evento) {
        return evento.operacao != undefined && evento.operacao == 'E';
    }
}

module.exports = EventoMudancaEstadoOperativoBusiness;