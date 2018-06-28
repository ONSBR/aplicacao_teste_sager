const BaseEntity = require("./_baseentity");

module.exports = class ClassificacaoOrigemEvento extends BaseEntity {

    constructor(id, idEvento, idUsina, idUge, idClassificacaoOrigem) {
        super();
        this.id = id;
        this.idEvento = idEvento;
        this.idUsina = idUsina;
        this.idUge = idUge;
        this.idClassificacaoOrigem = idClassificacaoOrigem;
    }

}
