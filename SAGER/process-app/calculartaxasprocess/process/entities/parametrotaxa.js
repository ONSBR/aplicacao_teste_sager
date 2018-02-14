const BaseEntity = require("./_baseentity");

module.exports = class ParametroTaxa extends BaseEntity {
    constructor(id, valorParametro, idTipoParametro, idUge, idFechamento,
        idExecucaoCalculoFechamento, mes, ano) {
            
        super();
        this.id = id;
        this.valorParametro = valorParametro ? valorParametro : 0;
        this.idTipoParametro = idTipoParametro;
        this.idUge = idUge;
        this.idFechamento = idFechamento;
        this.idExecucaoCalculoFechamento = idExecucaoCalculoFechamento;
        this.mes = mes;
        this.ano = ano;
    }
}
