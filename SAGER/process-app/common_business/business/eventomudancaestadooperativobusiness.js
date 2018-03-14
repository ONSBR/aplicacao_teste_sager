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

}

module.exports = EventoMudancaEstadoOperativoBusiness;