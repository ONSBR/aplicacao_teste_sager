const XLSX = require('xlsx');
const util = require('../../util');

class ParseMemoryFileTemplate {

    constructor(filtroPesquisa, eventos) {
        this.filtroPesquisa = filtroPesquisa;
        this.dataInicial = new Date(filtroPesquisa.dataInicial).toISOString().slice(0,10);
        this.dataFinal = new Date(filtroPesquisa.dataFinal).toISOString().slice(0,10);
        this.usina = filtroPesquisa.usina;
        this.fileNameSuffix = this.getFileNameSuffix();

        let filePath = "./templates/template_eventos.xlsx";
        this.workbook = XLSX.readFileSync(filePath);

        this.sheet = this.workbook.Sheets.eventos;
        this.eventos = eventos;
    }

    getFileNameSuffix() {
        return `${this.usina}_${this.dataInicial}_${this.dataFinal}`;
    }

    parse() {

        this.parseContent();

        var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
        var contentXlsx = XLSX.write(this.workbook, wopts);

        return contentXlsx;
    }

    parseContent() {
        this.sheet["B1"] = this.usina;
        this.sheet["B2"] = this.dataInicial;
        this.sheet["B3"] = this.dataFinal;
    }

}

/**
 * @description Obtém uma instância do parser com o template da lista de eventos.
 * @param {eventos} eventos 
 * @param {filtroPesquisa} filtroPesquisa
 */
module.exports.factory = function (filtroPesquisa, eventos) {
    return new ParseMemoryFileTemplate(filtroPesquisa, eventos);
}
