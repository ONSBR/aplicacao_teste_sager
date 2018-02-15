var TipoParametro = require("../constants").TipoParametro;
var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../constants").CondicaoOperativa;
var extensions = require("../../../extensions");

// Limites mais comuns de validação de aplicação de regras.
const dataEmSegundos_01_2000 = new Date(2000, 0, 1, 0, 0, 0).getTotalSeconds();
const dataEmSegundos_10_2014 = new Date(2014, 9, 1, 0, 0, 0).getTotalSeconds();

const estado_LIG_LCC_LCI_LCS = [EstadoOperativo.LIG, EstadoOperativo.LCC,
EstadoOperativo.LCI, EstadoOperativo.LCS];

/**
 * @description Origem de evento de indisponibilidade de geração, que é de responsabilidade do agente, 
 * e que nestes casos é cobrada taxa.
 */
const indisponibilidadeResponsabilidade = [ClassificacaoOrigem.GUM, ClassificacaoOrigem.GGE, ClassificacaoOrigem.GTR,
ClassificacaoOrigem.GOT, ClassificacaoOrigem.GAC,
ClassificacaoOrigem.GAG, ClassificacaoOrigem.GCB];

/**
 * @description Origem de evento de indisponibilidade de geração, que é de responsabilidade do agente, 
 * mas que não é cobrada taxa.
 */
const indisponibilidadeResponsabilidadeSemTaxas = [ClassificacaoOrigem.GCI, ClassificacaoOrigem.GIS, ClassificacaoOrigem.GIC,
ClassificacaoOrigem.GIM, ClassificacaoOrigem.GVO, ClassificacaoOrigem.GMP,
ClassificacaoOrigem.GMT];

/**
 * @description Origem de evento de indisponibilidade de geração, que não é de responsabilidade do agente.
 */
const indisponibilidadeNaoResponsabilidade = [ClassificacaoOrigem.GHN, ClassificacaoOrigem.GHT, ClassificacaoOrigem.GHI,
ClassificacaoOrigem.GHC, ClassificacaoOrigem.GRE, ClassificacaoOrigem.GRB,
ClassificacaoOrigem.GOU, ClassificacaoOrigem.GOO, ClassificacaoOrigem.GHM];

/**
 * @class UtilCalculoParametro
 * @description Classe utilitária para o cálculo de taxas, oferecendo métodos de validação mais usados,
 * e recursos de transformação.
 */
module.exports = class UtilCalculoParametro {

    static lt_01_2000(evtEstOper) {
        return evtEstOper.dataVerificadaEmSegundos < dataEmSegundos_01_2000;
    }

    static gte_01_2000(evtEstOper) {
        return evtEstOper.dataVerificadaEmSegundos >= dataEmSegundos_01_2000;
    }

    static between_01_2000_e_09_2014(evtEstOper) {
        return evtEstOper.dataVerificadaEmSegundos >= dataEmSegundos_01_2000
            && evtEstOper.dataVerificadaEmSegundos < dataEmSegundos_10_2014;
    }

    static gte_10_2014(evtEstOper) {
        return evtEstOper.dataVerificadaEmSegundos >= dataEmSegundos_10_2014;
    }

    static periodo_between_01_2000_e_09_2014(periodo) {
        return periodo.dataInicioEmSegundos >= dataEmSegundos_01_2000
            && periodo.dataInicioEmSegundos < dataEmSegundos_10_2014;
    }

    static periodo_gte_10_2014(periodo) {
        return periodo.dataInicioEmSegundos >= dataEmSegundos_10_2014;
    }

    static validarEstado_LIG_LCC_LCI_LCS(idEstadoOperativo) {
        return estado_LIG_LCC_LCI_LCS.indexOf(idEstadoOperativo) >= 0;
    }

    static validarIndisponibilidadeResponsabilidade(idClassificacaoOrigem) {
        return indisponibilidadeResponsabilidade.indexOf(idClassificacaoOrigem) >= 0;
    }

    static validarIndisponibilidadeResponsabilidadeSemTaxas(idClassificacaoOrigem) {
        return indisponibilidadeResponsabilidadeSemTaxas.indexOf(idClassificacaoOrigem) >= 0;
    }

    static validarIndisponibilidadeNaoResponsabilidade(idClassificacaoOrigem) {
        return indisponibilidadeNaoResponsabilidade.indexOf(idClassificacaoOrigem) >= 0;
    }

}
