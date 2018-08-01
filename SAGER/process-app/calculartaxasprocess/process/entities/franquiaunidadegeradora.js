const BaseEntity = require("./_baseentity");

module.exports = class FranquiaUnidadeGeradora extends BaseEntity {
    constructor(id, idUge, franquia) {
        super();
        this.id = id;
        this.idUge = idUge;
        this.franquia = franquia;
    }
}
