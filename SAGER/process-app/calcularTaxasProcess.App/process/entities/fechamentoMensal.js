const BaseEntity = require("./_baseEntity");

module.exports = class FechamentoMensal extends BaseEntity {
    
    constructor(id, mes, ano) {
        super();
        this.id = id;
        this.mes = mes;
        this.ano = ano;
    }
}
