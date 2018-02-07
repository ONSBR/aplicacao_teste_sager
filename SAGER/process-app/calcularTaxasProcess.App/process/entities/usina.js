const BaseEntity = require("./_baseEntity");

module.exports = class Usina extends BaseEntity {
    constructor(id, idUsina, nome) {
        super("usina");
        this.id = id;
        this.idUsina = idUsina;
        this.nome = nome;
    }
}
