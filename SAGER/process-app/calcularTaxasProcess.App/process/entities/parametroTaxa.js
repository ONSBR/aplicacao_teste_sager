const BaseEntity = require("./_baseEntity");

module.exports = class ParametroTaxa extends BaseEntity {
    constructor(id, valorParametro, idTipoParametro) {
        super();
        this.id = id;
        this.valorParametro = valorParametro ? valorParametro: 0;
        this.idTipoParametro = idTipoParametro;
    }
}
