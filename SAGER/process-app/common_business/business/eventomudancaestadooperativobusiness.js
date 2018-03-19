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
                console.log('tempoEmSegundosEOC = ' +tempoEmSegundosEOC);
            }

            console.log('-----------------');
            console.log(evento.idEstadoOperativo != 'EOC');
            console.log(tempoEmSegundosEOC != undefined);
            console.log(evento.dataVerificadaEmSegundos == tempoEmSegundosEOC);
            console.log('-----------------');
            
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

}

module.exports = EventoMudancaEstadoOperativoBusiness;