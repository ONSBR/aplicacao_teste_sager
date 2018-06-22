const BaseEntity = require("./_baseentity");

module.exports = class EstadoOperativoEvento extends BaseEntity {

    constructor(id, idEvento, idUge, idEstadoOperativo) {
        super();
        this.id = id;
        this.idEvento = idEvento;
        this.idUge = idUge;
        this.idEstadoOperativo = idEstadoOperativo;
    }

}
