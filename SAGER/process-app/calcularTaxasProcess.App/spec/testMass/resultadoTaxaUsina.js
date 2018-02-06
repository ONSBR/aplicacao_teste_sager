module.exports = class ResultadoTaxaUsina {
    constructor(idUsina, mes, ano, teifames, teipmes, teifaacum, teipacum) {
        this.idUsina = idUsina;
        this.mes = mes;
        this.ano = ano;
        this.teifames = teifames;
        this.teipmes = teipmes;
        this.teifaacum = teifaacum;
        this.teipacum = teipacum;
    }
}