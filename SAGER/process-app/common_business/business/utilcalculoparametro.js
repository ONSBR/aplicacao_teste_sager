const extensions = require("./extensions");
const moment = require("moment");
const dataEmSegundos_10_2014 = new Date(2014, 9, 1, 0, 0, 0).getTotalSeconds();
const dataEmSegundos_01_01_2001 = new Date(2001, 0, 1, 0, 0, 0).getTotalSeconds();
const CENTO_E_VINTE_MESES_EM_SEGUNDOS = 315576000;

class UtilCalculoParametro {

    static gte_10_2014(evento) {
        return evento.dataVerificada.getTotalSeconds() >= dataEmSegundos_10_2014;
    }

    static gte_01_01_2001(evento) {
        return evento.dataVerificada.getTotalSeconds() >= dataEmSegundos_01_01_2001;
    }

    static adicionaMeses(data, quantidadeMeses) {
        return moment(data).add(quantidadeMeses, 'month').toDate();
    }

    static adicionaHoras(data, quantidadeHoras) {
        return moment(data).add(quantidadeHoras, 'hours').toDate();
    }

    static calcularIntervaloEmHoras(dataInicio, dataFim) {
        return (dataFim.getTime() - dataInicio.getTime()) / 3600000;
    }

    static veficarTempoInferior120Meses(tempoInicialSegundos, tempoFinalSegundos) {
        if(tempoFinalSegundos - tempoInicialSegundos < CENTO_E_VINTE_MESES_EM_SEGUNDOS) {
            throw new Error('Não pode haver registro de evento com Origem “GIM” antes do Equipamento completar 120 meses de entrada em operação comercial.');
        };
    }

}

module.exports = UtilCalculoParametro;
