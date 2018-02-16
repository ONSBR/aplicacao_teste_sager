const BaseEntity = require("./_baseentity");

/**
 * @class UnidadeGeradora
 * @description Entidade que representa a unidade geradora da usina para qual são 
 * computados os parâmetros de operação.
 */
module.exports = class UnidadeGeradora extends BaseEntity {
    constructor(id, idUge, idUsina, potenciaDisponivel, dataInicioOperacao) {
        super();
        this.id = id;
        this.idUge = idUge;
        this.idUsina = idUsina;
        this.potenciaDisponivel = potenciaDisponivel;
        this.dataInicioOperacao = dataInicioOperacao;
    }
}
