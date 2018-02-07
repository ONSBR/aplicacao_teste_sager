const BaseEntity = require("./_baseEntity");

module.exports = class Taxa extends BaseEntity {
    constructor(id, valorTaxa, idTipoTaxa, idFechamento, idUsina) {
        super();
        this.id = id;
        this.valorTaxa = valorTaxa ? valorTaxa: 0;
        this.idTipoTaxa = idTipoTaxa;
        this.idFechamento = idFechamento;
        this.idUsina = idUsina;
    }
}
