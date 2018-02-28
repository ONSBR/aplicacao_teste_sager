const XLSX = require('xlsx');
const Util = require('./util');

class ParseMemoryFileTemplate {

    constructor(uges, dataInicial, dataFinal, eventos) {
        this.uges = uges;
        if (dataInicial && dataFinal) {
            this.dataInicial = new Date(dataInicial).toISOString().slice(0, 10);
            this.dataFinal = new Date(dataFinal).toISOString().slice(0, 10);
            this.fileNameSuffix = this.getFileNameSuffix();
        }
        this.workbook = XLSX.utils.book_new();
        this.eventos = eventos;
    }

    getFileNameSuffix() {
        return `${this.uges.join(';')}_${this.dataInicial}_${this.dataFinal}`;
    }

    parse() {
        let wsData = [];
        wsData.push(['Eventos']);
        wsData.push(this.getCabecalhoEventos());
        this.adicionaListaDeEventos(wsData);
        let workSheet = XLSX.utils.aoa_to_sheet(wsData);

        this.workbook.SheetNames.push('eventos');
        this.workbook.Sheets['eventos'] = workSheet;
        this.sheet = this.workbook.Sheets['eventos'];
        let wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
        let contentXlsx = XLSX.write(this.workbook, wopts);
        return contentXlsx;
    }

    adicionaListaDeEventos(wsData) {
        const formatDD_MM_YYYY_HH_mm_ss = 'DD-MM-YYYY HH:mm:ss';
        this.eventos.forEach(evento => {
            let linhaEvento = [];
            if (this.uges) {
                let unidadeGeradora = this.uges.filter(uge => { return uge.idUge === evento.idUge })[0];
                linhaEvento.push(unidadeGeradora.idUsina);
            } else {
                linhaEvento.push(evento.idUsina)
            }

            linhaEvento.push(evento.idUge);
            linhaEvento.push(evento.idEvento);
            linhaEvento.push(Util.textToExcel(evento.idEstadoOperativo));
            linhaEvento.push(Util.textToExcel(evento.idCondicaoOperativa));
            linhaEvento.push(Util.textToExcel(evento.idClassificacaoOrigem));
            linhaEvento.push(Util.formatDate(evento.dataVerificada, formatDD_MM_YYYY_HH_mm_ss));
            linhaEvento.push(evento.potenciaDisponivel);
            if(evento.operacao) {
                linhaEvento.push(evento.operacao);
            }
            wsData.push(linhaEvento);
        });
    }


    getCabecalhoEventos() {
        return ['id_usina', 'uge_id', 'desger_id', 'tpestoper_id', 'panocr_id', 'ogresdes_id', 'dtini_verif', 'valdisp', 'operacao'];
    }

    getUsina() {
        let header = [];
        header[0] = 'Usina';
        header[1] = this.usina;
        return header;
    }

    getDataInicial() {
        let header = [];
        header[0] = 'Data Inicial';
        header[1] = this.dataInicial;
        return header;
    }

    getDataFinal() {
        let header = [];
        header[0] = 'Data Final';
        header[1] = this.dataFinal;
        return header;
    }

}

/**
 * @description Obtém uma instância do parser com o template da lista de eventos.
 * @param {eventos} eventos 
 * @param {filtroPesquisa} filtroPesquisa
 */
module.exports.factory = function (uges, dataInicial, dataFinal, eventos) {
    return new ParseMemoryFileTemplate(uges, dataInicial, dataFinal, eventos);
}
