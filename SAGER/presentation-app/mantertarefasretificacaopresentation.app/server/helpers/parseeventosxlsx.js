const XLSX = require('xlsx');
const Util = require('./util');
const FORMAT_DATE_EXCEL = "DD/MM/YYYY HH:mm:ss";

class ParseMemoryFileTemplate {

    constructor(uges, dataInicial, dataFinal, eventos) {
        this.uges = uges;
        if (dataInicial && dataFinal) {
            this.dataInicial = new Date(dataInicial).toISOString().slice(0, 10);
            this.dataFinal = new Date(dataFinal).toISOString().slice(0, 10);
        }
        this.workbook = XLSX.utils.book_new();
        this.eventos = eventos;
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

            //FIXME criar metodo para validar origem do download
            let unidadeGeradora;
            if (this.uges) {
                unidadeGeradora = this.uges.filter(uge => { return uge.idUge === evento.idUge })[0];
                linhaEvento.push(unidadeGeradora.idUsina);
            } else {
                linhaEvento.push(evento.idUsina);
            }

            linhaEvento.push(evento.idUge);
            linhaEvento.push(evento.idEvento);
            linhaEvento.push(Util.textToExcel(evento.idEstadoOperativo));
            linhaEvento.push(Util.textToExcel(evento.idCondicaoOperativa));
            linhaEvento.push(Util.textToExcel(evento.idClassificacaoOrigem));
            linhaEvento.push(Util.dateToExcelStr(evento.dataVerificada));
            if (unidadeGeradora) {
                linhaEvento.push(this.getDisponibilidade(unidadeGeradora, evento));
            } else {
                linhaEvento.push(evento.potenciaDisponivel);
            }
            if (evento.operacao) {
                linhaEvento.push(evento.operacao);
            }
            wsData.push(linhaEvento);
        });
    }

    //RS_RINT019 - Preenchimento Automático do Campo Disponibilidade
    getDisponibilidade(uge, evento) {
        let disponibilidade;

        const NOR_NOT_TST = ['NOR', 'NOT', 'TST'];
        const OUTRAS_CONDICOES_OPERATIVAS = ['DEM', 'DUR', 'DAU', 'DCA', 'DPR', 'DPA', 'DAP', 'DES', 'DOM'];
        if (NOR_NOT_TST.includes(evento.idCondicaoOperativa)) {
            disponibilidade = uge.potenciaDisponivel;
        } else if (OUTRAS_CONDICOES_OPERATIVAS.includes(evento.idCondicaoOperativa)) {
            disponibilidade = 0;
        }

        return disponibilidade;
    }

    getCabecalhoEventos() {
        return ['id_usina', 'uge_id', 'desger_id', 'tpestoper_id', 'panocr_id', 'ogresdes_id', 'dtini_verif', 'valdisp', 'operacao'];
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
