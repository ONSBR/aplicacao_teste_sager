const BaseEntity = require("./_baseentity");

module.exports = class FechamentoMensal extends BaseEntity {
    
    constructor(id, mes, ano, dataCriacao) {
        super("fechamento-mensal");
        this.id = id;
        this.mes = mes;
        this.ano = ano;
        this.dataCriacao = dataCriacao;
    }
}
