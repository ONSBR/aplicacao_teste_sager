const BaseEntity = require("./_baseentity");

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
