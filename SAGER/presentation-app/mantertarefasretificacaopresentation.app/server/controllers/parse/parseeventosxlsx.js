const XLSX = require('xlsx');
const util = require('../../util');

class ParseMemoryFileTemplate {

    constructor(idUsina, dataInicial, dataFinal, eventos) {
        this.usina = idUsina;
        this.dataInicial = new Date(dataInicial).toISOString().slice(0, 10);
        this.dataFinal = new Date(dataFinal).toISOString().slice(0, 10);
        this.fileNameSuffix = this.getFileNameSuffix();

        this.workbook = XLSX.utils.book_new();

        this.eventos = eventos;
    }

    getFileNameSuffix() {
        return `${this.usina}_${this.dataInicial}_${this.dataFinal}`;
    }

    parse() {
        var wsData = [this.getUsina(), this.getDataInicial(), this.getDataFinal()];
        this.parseEventos(wsData);
        var workSheet = XLSX.utils.aoa_to_sheet(wsData);

        this.workbook.SheetNames.push('eventos');
        this.workbook.Sheets['eventos'] = workSheet;
        this.sheet = this.workbook.Sheets['eventos'];
        var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
        var contentXlsx = XLSX.write(this.workbook, wopts);
        return contentXlsx;
    }

    getUsina() {
        let header = [];
        header[0] = 'Usina';
        header[1] = this.usina;
        return header;
    }

    getDataInicial(){
        let header = [];
        header[0] = 'Data Inicial';
        header[1] = this.dataInicial;
        return header;
    }

    getDataFinal(){
        let header = [];
        header[0] = 'Data Final';
        header[1] = this.dataFinal;
        return header;
    }

    parseEventos() {
        // let eventRow = 8;
        // this.eventos.forEach(evento => {
        //     this.sheet[`A${eventRow}`] = { v: evento.idEvento };
        //     eventRow++;
        // });
    }

}

/**
 * @description Obtém uma instância do parser com o template da lista de eventos.
 * @param {eventos} eventos 
 * @param {filtroPesquisa} filtroPesquisa
 */
module.exports.factory = function (idUsina, dataInicial, dataFinal, eventos) {
    return new ParseMemoryFileTemplate(idUsina, dataInicial, dataFinal, eventos);
}
