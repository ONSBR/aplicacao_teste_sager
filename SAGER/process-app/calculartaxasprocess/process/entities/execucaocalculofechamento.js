const BaseEntity = require("./_baseentity");

/**
 * @description Entidade que representa uma execução de cálculo de taxas solicitada para
 * o sistema.
 */
module.exports = class ExecucaoCalculoFechamento extends BaseEntity {
    constructor(id, dataInicio, dataFim, idFechamento, idCenario, idTarefa, protocolo) {
        super("execucao-calculo-fechamento");
        this.id = id;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.idFechamento = idFechamento;
        this.idCenario = idCenario;
        this.idTarefa = idTarefa;
        this.protocolo = protocolo;
    }
}
