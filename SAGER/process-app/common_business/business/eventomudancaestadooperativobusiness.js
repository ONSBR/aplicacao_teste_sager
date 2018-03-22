const UtilCalculoParametro = require('./utilcalculoparametro');
const extensions = require("./extensions");

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
            if (this.isEventoExclusao(eventos[i]) && this.isUltimoEventoMes(eventos[i], eventos[i + 1])) {
                this.refletirAlteracoesParaEventosEspelhos(eventos[i - 1], eventos, i + 1);
            }
        }
    }

    isEventoExclusao(evento) {
        return evento.operacao != undefined && evento.operacao == 'E';
    }

    /**
     * RNI205 - Eventos de mudança de estado operativo consecutivos com os mesmos valores de estado operativo, condição operativa, 
     * origem e disponibilidade: Caso existam eventos de mudança de estado operativo consecutivos com os mesmos valores de estado 
     * operativo, condição operativa, origem e disponibilidade, exceto no caso do evento espelho, preservar o primeiro evento e 
     * excluir os demais eventos consecutivos que estão com os mesmos valores de estado operativo, condição operativa, 
     * origem e disponibilidade, exceto o evento espelho.
     * @param {EventoMudancaEstadoOperativo[]} eventosMudancasEstadosOperativos - array de eventos.
     */
    excluirEventosConsecutivosSemelhantes(eventos) {
        for (let i = 0; i < eventos.length; i++) {
            if (eventos[i + 1] != undefined) {
                if (eventos[i].idEstadoOperativo == eventos[i + 1].idEstadoOperativo &&
                    eventos[i].idCondicaoOperativa == eventos[i + 1].idCondicaoOperativa &&
                    eventos[i].idClassificacaoOrigem == eventos[i + 1].idClassificacaoOrigem &&
                    eventos[i].potenciaDisponivel == eventos[i + 1].potenciaDisponivel && !this.isEventoEspelho(eventos[i + 1], eventos[i])) {
                    eventos[i + 1].operacao = 'E';
                }
            }
        }
    }
    /**
     *  RNI207 - Tempo limite para utilização da  franquia GIC: Regra válida após 10/2014
     *  Não pode haver registro de evento de Mudança de Estado Operativo com Origem “GIC” após 24 meses de operação comercial do Equipamento.
     *  Regra válida antes de 10/2014:
     *  Não pode haver registro de evento de Mudança de Estado Operativo com Origem “GIC” após 15000 horas de operação comercial do Equipamento (horas em serviço).
     * @param {EventoMudancaEstadoOperativo[]} eventos 
     */
    verificarTempoLimiteFranquiaGIC(eventos) {
        let dataVerificadaEOCApos24Meses;
        let dataVerificadaEOCApos15000;
        for (let i = 0; i < eventos.length; i++) {

            if (eventos[i].idEstadoOperativo == 'EOC' && dataVerificadaEOCApos24Meses == undefined && dataVerificadaEOCApos15000 == undefined) {
                dataVerificadaEOCApos24Meses = UtilCalculoParametro.adicionaMeses(eventos[i].dataVerificada, 24);
                dataVerificadaEOCApos15000 = UtilCalculoParametro.adicionaHoras(eventos[i].dataVerificada, 15000);
            }

            if (UtilCalculoParametro.gte_10_2014(eventos[i])) {
                if (this.isEventoGIC(eventos[i]) &&
                    eventos[i].dataVerificada.getTotalSeconds() > dataVerificadaEOCApos24Meses.getTotalSeconds()) {
                    throw new Error('Evento GIC após 24 meses do EOC.');
                }
            } else {
                if (this.isEventoGIC(eventos[i]) &&
                    eventos[i].dataVerificada.getTotalSeconds() > dataVerificadaEOCApos15000.getTotalSeconds()) {
                    throw new Error('Evento GIC após 15000 horas do EOC.');
                }
            }
        }
    }
    /**
     * RNI208 - Valor de horas limite para utilização da franquia GIC: Regra desde 01/01/2001
     * Não pode haver registro de evento com Origem “GIC” que ultrapasse o limite de 960 horas.
     * @param {EventoMudancaEstadoOperativo[]} eventos
     */
    verificarLimite960HorasEventoGIC(eventos) {
        for (let i = 0; i < eventos.length; i++) {
            if (this.isEventoGIC(eventos[i]) && UtilCalculoParametro.gte_01_01_2001(eventos[i])) {
                for (let j = i + 1; j < eventos.length; j++) {
                    if (!this.isEventoEspelho(eventos[j], eventos[j - 1])) {
                        if (UtilCalculoParametro.calcularIntervaloEmHoras(eventos[i].dataVerificada,
                            eventos[j].dataVerificada) > 960) {
                            throw new Error('Não pode haver registro de evento com Origem “GIC” que ultrapasse o limite de 960 horas.');
                        }
                    }
                }
            }
        }

    }

    isEventoGIC(evento) {
        return evento.idClassificacaoOrigem == 'GIC';
    }

}

module.exports = EventoMudancaEstadoOperativoBusiness;