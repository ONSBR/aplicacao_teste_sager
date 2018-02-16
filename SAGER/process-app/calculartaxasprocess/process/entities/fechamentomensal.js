const BaseEntity = require("./_baseentity");

/**
 * @class FechamentoMensal
 * @description Entidade que representa um fechamento mensal (mes/ano) para fazer o cálculo de taxas correspondente.
 */
module.exports = class FechamentoMensal extends BaseEntity {
    
    constructor(id, mes, ano, dataCriacao) {
        super();
        this.id = id;
        this.mes = mes;
        this.ano = ano;
        this.dataCriacao = dataCriacao;
    }
}
