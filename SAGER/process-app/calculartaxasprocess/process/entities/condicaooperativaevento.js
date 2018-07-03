const BaseEntity = require("./_baseentity");

module.exports = class CondicaoOperativaEvento extends BaseEntity {

    constructor(id, idEvento, idUsina, idUge, idCondicaoOperativa, dataVerificada) {
        super();
        this.id = id;
        this.idEvento = idEvento;
        this.idUsina = idUsina;
        this.idUge = idUge;
        this.idCondicaoOperativa = idCondicaoOperativa;
        this.dataVerificada = dataVerificada;
    }

}
