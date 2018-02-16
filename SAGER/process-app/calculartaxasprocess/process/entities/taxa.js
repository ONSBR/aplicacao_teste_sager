const BaseEntity = require("./_baseentity");

/**
 * @class Taxa
 * @description Entidade que representa a taxa calculada para uma usina 
 * em um determinado fechamento (mes/ano).
 */
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
