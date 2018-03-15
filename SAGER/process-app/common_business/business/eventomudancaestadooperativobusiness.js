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
            if(evento.idEstadoOperativo == 'EOC'){
                countEventosEOC++;
                if(countEventosEOC > 1) {
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
        //Será apenas para campos de disponibilidades vazios?
        if(!evento.potenciaDisponivel) {
            const NOR_NOT_TST = ['NOR', 'NOT', 'TST'];
            const CONDICOES_OPERATIVAS_DESLIGADO_EXCETO_DCO = ['DEM', 'DUR', 'DAU', 'DCA', 'DPR', 'DPA', 'DAP', 'DES', 'DOM'];
            if (NOR_NOT_TST.includes(evento.idCondicaoOperativa)) {
                evento.potenciaDisponivel = uge.potenciaDisponivel;
            } else if (CONDICOES_OPERATIVAS_DESLIGADO_EXCETO_DCO.includes(evento.idCondicaoOperativa)) {
                evento.potenciaDisponivel = 0;
            }
        }
    }


}

module.exports = EventoMudancaEstadoOperativoBusiness;