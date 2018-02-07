const BaseEntity = require("./_baseEntity");

module.exports = class FechamentoMensal extends BaseEntity {
    
    constructor(id, mes, ano, dataCriacao) {
        super("fechamento-mensal");
        this.id = id;
        this.mes = mes;
        this.ano = ano;
        this.dataCriacao = dataCriacao;
    }
}
