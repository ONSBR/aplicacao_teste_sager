class EventoMudancaEstadoOperativoBusiness {

    /**
     * RNI080 - Entrada em Operação Comercial de um equipamento. 
     * É obrigatória a existência de um, e somente um, evento com o estado operativo EOC para 
     * indicar a entrada em operação comercial de um equipamento.
     * @param {EventoMudancaEstadoOperativo[]} eventosMudancasEstadosOperativos - array de eventos.
     */
    verificarUnicidadeEventoEntradaOperacaoComercial(eventosMudancasEstadosOperativos) {
        let countEventosEOC = 0;
        let retorno = true;
        eventosMudancasEstadosOperativos.forEach(evento => {
            // FIXME constantes
            if (evento.idEstadoOperativo == 'EOC') {
                countEventosEOC++;
                if (countEventosEOC > 1) {
                    retorno = false;
                }
            }
        });

        return retorno;
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
            if (NOR_NOT_TST.includes(evento.idCondicaoOperativa)) {
                evento.potenciaDisponivel = uge.potenciaDisponivel;
            }

            const ESTADOS_OPERATIVOS_DESLIGADO_EXCETO_DCO = ['DEM', 'DUR', 'DAU', 'DCA', 'DPR', 'DPA', 'DAP', 'DES', 'DOM'];
            if (ESTADOS_OPERATIVOS_DESLIGADO_EXCETO_DCO.includes(evento.idEstadoOperativo)) {
                evento.potenciaDisponivel = 0;
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
        if (eventoAnterior.idEstadoOperativo == 'LIG' && evento.idEstadoOperativo == 'DCO' &&
            evento.idClassificacaoOrigem != 'GRE') {
            return (eventoAnterior.idCondicaoOperativa == evento.idCondicaoOperativa) && 
                        (eventoAnterior.idClassificacaoOrigem == evento.idClassificacaoOrigem) && 
                            (eventoAnterior.potenciaDisponivel == evento.potenciaDisponivel) 
        }
    }

}

module.exports = EventoMudancaEstadoOperativoBusiness;