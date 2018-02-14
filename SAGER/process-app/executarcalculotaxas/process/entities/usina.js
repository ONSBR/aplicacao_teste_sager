const BaseEntity = require("./_baseentity");

module.exports = class Usina extends BaseEntity {
    constructor(id, idUsina, nome) {
        super();
        this.id = id;
        this.idUsina = idUsina;
        this.nome = nome;
    }
}
