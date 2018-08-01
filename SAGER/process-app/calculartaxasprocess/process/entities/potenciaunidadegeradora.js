const BaseEntity = require("./_baseentity");

module.exports = class PotenciaUnidadeGeradora extends BaseEntity {
    constructor(id, idUge, potenciaDisponivel) {
        super();
        this.id = id;
        this.idUge = idUge;
        this.potenciaDisponivel = potenciaDisponivel;
    }
}
