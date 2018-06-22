const BaseEntity = require("./_baseentity");

module.exports = class CondicaoOperativaEvento extends BaseEntity {

    constructor(id, idEvento, idUge, idCondicaoOperativa) {
        super();
        this.id = id;
        this.idEvento = idEvento;
        this.idUge = idUge;
        this.idCondicaoOperativa = idCondicaoOperativa;
    }

}
