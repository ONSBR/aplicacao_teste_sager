const BaseEntity = require("./_baseentity");

module.exports = class ClassificacaoOrigemEvento extends BaseEntity {

    constructor(id, idEvento, idUge, idClassificacaoOrigem) {
        super();
        this.id = id;
        this.idEvento = idEvento;
        this.idUge = idUge;
        this.idClassificacaoOrigem = idClassificacaoOrigem;
    }

}
