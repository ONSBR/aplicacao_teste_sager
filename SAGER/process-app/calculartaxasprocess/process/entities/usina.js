const BaseEntity = require("./_baseentity");

/**
 * @class Usina
 * @description Entidade que representa a usina para a qual serão calculadas as taxas.
 */
module.exports = class Usina extends BaseEntity {
    constructor(id, idUsina, nome, franquia) {
        super();
        this.id = id;
        this.idUsina = idUsina;
        this.nome = nome;
        this.franquia = franquia;
    }
}
