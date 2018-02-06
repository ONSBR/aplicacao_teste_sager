const BaseEntity = require("./_baseEntity");

module.exports = class UnidadeGeradora extends BaseEntity {
    constructor(id, idUsina, potenciaDisponivel, dataInicioOperacao) {
        super();
        this.id = id;
        this.idUsina = idUsina;
        this.potenciaDisponivel = potenciaDisponivel;
        this.dataInicioOperacao = dataInicioOperacao;
    }
}
