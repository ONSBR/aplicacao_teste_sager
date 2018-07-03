const BaseEntity = require("./_baseentity");

module.exports = class EstadoOperativoEvento extends BaseEntity {

    constructor(id, idEvento, idUsina, idUge, idEstadoOperativo, dataVerificada) {
        super();
        this.id = id;
        this.idEvento = idEvento;
        this.idUsina = idUsina;
        this.idUge = idUge;
        this.idEstadoOperativo = idEstadoOperativo;
        this.dataVerificada = dataVerificada;
    }

}
