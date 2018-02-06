var EstadoOperativo = require("../constants").EstadoOperativo;
var ClassificacaoOrigem = require("../constants").ClassificacaoOrigem;
var utils = require("../../../utils");

/**
 * @description Classe abstrata que representa o cálculo de parâmetros.
 */
class AbstractCalculoParametro {
    
    constructor(tipoParametro, unidadeGeradora) {
        this.tipoParametro = tipoParametro;
        this.unidadeGeradora = unidadeGeradora;
        this.qtdHorasEmSegundos = 0;
    }    

    reset() {
        this.qtdHorasEmSegundos = 0;
    }
 
    /**
     * @description Obtém a quantidade de horas resultado do cálculo do parâmetro.
     */
    get qtdHoras () {
        return utils.secondToHour(this.qtdHorasEmSegundos);
    }

    validarUnidadeGeradora() {
        if (!this.unidadeGeradora) {
            throw new Error("A unidade geradora deve ser informada!");
        }
    }
}

/**
 * @description Classe abstrata que representa o cálculo de parâmetros baseados em eventos.
 */
class AbstractCalculoParametroEvento extends AbstractCalculoParametro {
    
    constructor(tipoParametro, unidadeGeradora) {
        super(tipoParametro, unidadeGeradora);
        this.eventoMudancaEstadoCorrente = null;       
    }
    
    reset() {
        super.reset();
        this.eventoMudancaEstadoCorrente = null;       
    }
}

/**
 * @description Classe abstrata que representa o cálculo de parâmetros baseados em eventos, 
 * mas que faz o calculo baseado na diferença de horas entre os eventos.
 */
class AbstractCalculoParametroEventoDiferenca extends AbstractCalculoParametroEvento {
    
    constructor(tipoParametro, unidadeGeradora) {
        super(tipoParametro, unidadeGeradora);
    }

    /**
     * Faz o cálculo comum para os tipos de parametros que apenas faz a diferença em horas dos estados.
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    computarEvento(evtEstOper) {
        
        var isEventoTipoTaxa = this.validarEvento(evtEstOper);
        
        if (isEventoTipoTaxa) {
            if (!this.eventoMudancaEstadoCorrente) {
                this.eventoMudancaEstadoCorrente = evtEstOper;
            }
        } else if (this.eventoMudancaEstadoCorrente) {
            var diferencaEvtECorrente = evtEstOper.dataVerificadaEmSegundos - this.eventoMudancaEstadoCorrente.dataVerificadaEmSegundos;
            this.qtdHorasEmSegundos += diferencaEvtECorrente;
            this.eventoMudancaEstadoCorrente = null;
        }
        
    }
}

/**
 * @description Classe abstrata que representa o cálculo de parâmetros baseados em eventos, 
 * mas que faz o calculo baseado na diferença de horas entre os eventos, e considera limitação 
 * de potência nominal.
 */
class AbstractCalculoParametroEventoLimitacaoPotencia extends AbstractCalculoParametroEvento {
    
    constructor(tipoParametro, unidadeGeradora) {
        super(tipoParametro, unidadeGeradora);
    }

    /**
     * Computa o evento para o cálculo do tipo de parâmetro de taxa, 
     * considerando a limitação de potência nominal durante o evento.
     * @param {EventoMudancaEstadoOperativo} evtEstOper 
     */
    computarEvento(evtEstOper) {
        
        super.validarUnidadeGeradora();
        this.validarPotenciaUnidadeGeradora();

        var isEventoTipoTaxa = this.validarEvento(evtEstOper);
        
        if (this.eventoMudancaEstadoCorrente) {
            
            var diferencaEvtECorrente = evtEstOper.dataVerificadaEmSegundos - this.eventoMudancaEstadoCorrente.dataVerificadaEmSegundos;
            
            // cálculo considerando a defazagem da potencia no evento
            diferencaEvtECorrente = diferencaEvtECorrente * this.calcularLimitacaoDePotenciaCorrente();

            this.qtdHorasEmSegundos += diferencaEvtECorrente;
        }

        if (isEventoTipoTaxa) {
            this.eventoMudancaEstadoCorrente = evtEstOper;
        } else {
            this.eventoMudancaEstadoCorrente = null;
        }
    }

    /**
     * @description Calcula o valor percentual de limitação de potencia da unidade após a mudança de estado do evento corrente.
     */
    calcularLimitacaoDePotenciaCorrente() {
        
        return (this.unidadeGeradora.potenciaDisponivel - this.eventoMudancaEstadoCorrente.potenciaDisponivel) / this.unidadeGeradora.potenciaDisponivel;
    }

    /**
     * @description Valida se a unidade geradora possui a potência de cadastro.
     */
    validarPotenciaUnidadeGeradora() {
        if (!this.unidadeGeradora.potenciaDisponivel) {
            throw new Error("Deve ser informada a potencia da unidade geradora.");
        }
    }
}

var exports = {
    AbstractCalculoParametro, 
    AbstractCalculoParametroEvento, 
    AbstractCalculoParametroEventoDiferenca,
    AbstractCalculoParametroEventoLimitacaoPotencia
}

module.exports = exports;