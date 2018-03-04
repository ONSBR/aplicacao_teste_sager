const Enumerable = require('linq');
const XLSX = require('xlsx');
const util = require('../../util');
const TipoParametro = require('./constants').TipoParametro;
const TipoTaxa = require('./constants').TipoTaxa;

/**
 * @class ParseFileTemplate
 * @description Classe responsável por definir as informações básica de taxa no
 * documento xlsx, informações comuns a todas taxas.
 */
class ParseResultadoReproducaoFile {

    constructor(resultadoComparacaoReproducao, configTaxa) {

        this.resultado = resultadoComparacaoReproducao
        this.context = this.resultado.contextOriginal;

        this.configTaxa = configTaxa;

        this.taxa = this.resultado.taxaComparacao.original;

        this.workbook = XLSX.utils.book_new();

        this.sheet = [];
    }

    gerarAgrupamentoUge() {

        // agrupamento de uge
        var grpArray = [];
        var grpParam = Enumerable.from(grpArray);
        var grpUgeMesAno = function (param) {
            if (!grpParam.any(grp => { return grp.idUge == param.idUge && grp.mes == param.mes && grp.ano == param.ano })) {
                grpArray.push({ idUge: param.idUge, mes: param.mes, ano: param.ano });
            }
        };
        this.resultado.parametrosComparacao.forEach(it => grpUgeMesAno(it.comum));

        grpParam = grpParam.orderByDescending(it => { return it.ano + "-" + it.mes.zeroFillLeft(2) });
        this.grpParam = grpParam;
    }

    recoverData() {

        // lista de uge
        this.uges = Enumerable.from(this.context.dataset.entities.unidadegeradora);

        this.gerarAgrupamentoUge();

        // id de usina
        this.idUsina = this.context.event.payload.idUsina;

        // obtem fechamento
        this.fechamento = Enumerable.from(this.context.dataset.entities.fechamentomensal).firstOrDefault();
    }

    getParametroByItemGroup(itemGroup, tipoParametro, isoriginal) {
        var paramComparacao = Enumerable.from(this.resultado.parametrosComparacao).firstOrDefault(pc => {
            var p = isoriginal ? pc.original : pc.reproducao;
            return p && p.idUge == itemGroup.idUge && p.mes == itemGroup.mes && p.ano == itemGroup.ano
                && p.idTipoParametro == tipoParametro
        });
        return paramComparacao? isoriginal ? paramComparacao.original : paramComparacao.reproducao : null;
    }

    mountLabelExecucao() {
        this.sheet["A1"] = { v: this.configTaxa.title };
        this.sheet["A2"] = { v: "Usina:" };
        this.sheet["A3"] = { v: "Protocolo:" };
        this.sheet["A4"] = { v: "Data Execução:" };
        this.sheet["A5"] = { v: "Valor Taxa:" };
        this.sheet["A6"] = { v: "Mês/Ano:" };
        this.sheet["A7"] = { v: "Cenário:" };
    }

    parseContent() {

        this.recoverData();

        this.mountLabelExecucao();

        this.sheet["B2"] = { v: this.idUsina };

        var execucaoOriginal = this.resultado.execucaoOriginal;
        var execucaoReproducao = this.resultado.execucaoReproducao;

        if (execucaoOriginal) {
            this.sheet["B3"] = { v: execucaoOriginal.protocolo };
            this.sheet["B4"] = { v: util.formatDate(execucaoOriginal.dataInicio) };
        }

        if (execucaoReproducao) {

            this.sheet["E3"] = headerReproducao("Protocolo:");
            this.sheet["E4"] = headerReproducao("Data Execução:");

            this.sheet["F3"] = { v: execucaoReproducao.protocolo };
            this.sheet["F4"] = { v: util.formatDate(execucaoReproducao.dataInicio) };
        }

        this.sheet["B5"] = { v: this.taxa.valorTaxa };
        if (this.resultado.taxaComparacao.reproducao) {
            this.sheet["E5"] = headerReproducao("Valor Taxa:");
            this.sheet["F5"] = { v: this.resultado.taxaComparacao.reproducao };
        }

        this.sheet["B6"] = { v: (this.fechamento.mes.zeroFillLeft(2) + "/" + this.fechamento.ano) };

        // TODO this.sheet["B7"] info de cenário, quando tiver o caso de uso de cenário.

        // indica se a taxa se trata de taxa acumulada
        if (this.taxa.idTipoTaxa == TipoTaxa.TEIPacum || this.taxa.idTipoTaxa == TipoTaxa.TEIFAacum) {
            this.sheet["G1"] = { v: "Acumulada" };
        }

        this.parseParametros();

        this.parseEventos();

    }

    mountHeaderParametros() {

        this.sheet["A9"] = { v: "Parâmetros" };
        this.sheet["A10"] = { v: "UGE_ID" };
        this.sheet["B10"] = { v: "Mês" };
        this.sheet["C10"] = { v: "Ano" };
        this.sheet["D10"] = { v: "Iníco Oper" };
        this.sheet["E10"] = { v: "P" };

        this.configTaxa.header_tiposparametros.forEach(it => {
            this.sheet[it.col] = it.text;
        })
    }

    parseParametros() {

        this.mountHeaderParametros();

        this.curRow = 11;
        this.grpParam.forEach(it => {

            var uge = this.uges.first(ug => { return ug.idUge == it.idUge });

            this.sheet["A" + this.curRow] = { v: it.idUge };
            this.sheet["B" + this.curRow] = { v: it.mes };
            this.sheet["C" + this.curRow] = { v: it.ano };
            this.sheet["D" + this.curRow] = { v: util.formatDate(uge.dataInicioOperacao) };
            this.sheet["E" + this.curRow] = { v: uge.potenciaDisponivel };

            this.configTaxa.cols_tiposparametros.forEach(ct => {

                var param = this.getParametroByItemGroup(it, ct.tipoParametro, ct.isoriginal);

                if (param) {
                    this.sheet[ct.columnLetter + this.curRow] = { v: util.numberToExcel(param.valorParametro) };
                }
            });

            this.curRow++;
        });
    }

    mountHeaderEventos() {

        this.curRow++;
        this.curRow++;

        this.sheet["A" + this.curRow] = { v: "Diferença de Eventos" };

        this.curRow++;

        this.sheet["A" + this.curRow] = header("desger_id");
        this.sheet["B" + this.curRow] = header("uge_id");

        this.sheet["C" + this.curRow] = header("tpestoper_id");
        this.sheet["D" + this.curRow] = header("panocr_id");
        this.sheet["E" + this.curRow] = header("ogresdes_id");
        this.sheet["F" + this.curRow] = header("dtini_verif");
        this.sheet["G" + this.curRow] = header("valdisp");
        this.sheet["H" + this.curRow] = header("duração");
        this.sheet["I" + this.curRow] = header("computado");
        this.sheet["J" + this.curRow] = header("tipo_mudanca");

        this.sheet["K" + this.curRow] = headerReproducao("tpestoper_id");
        this.sheet["L" + this.curRow] = headerReproducao("panocr_id");
        this.sheet["M" + this.curRow] = headerReproducao("ogresdes_id");
        this.sheet["N" + this.curRow] = headerReproducao("dtini_verif");
        this.sheet["O" + this.curRow] = headerReproducao("valdisp");

        this.curRow++;
    }

    parseEventos() {

        this.mountHeaderEventos();

        // Parse dos eventos
        this.resultado.eventosComparacao.forEach(it => {

            var dadosComuns = it.comum;

            var containTipo = dadosComuns.tiposParametrosComputados && dadosComuns.tiposParametrosComputados.length > 0;
            var qtdTipos = containTipo ? dadosComuns.tiposParametrosComputados.length : 1;

            for (var i = 0; i < qtdTipos; i++ , this.curRow++) {

                this.sheet["A" + this.curRow] = { v: dadosComuns.idEvento };
                this.sheet["B" + this.curRow] = { v: dadosComuns.idUge };
                if (it.original) {

                    this.sheet["C" + this.curRow] = { v: util.textToExcel(it.original.idEstadoOperativo) };
                    this.sheet["D" + this.curRow] = { v: util.textToExcel(it.original.idCondicaoOperativa) };
                    this.sheet["E" + this.curRow] = { v: util.textToExcel(it.original.idClassificacaoOrigem) };
                    this.sheet["F" + this.curRow] = { v: util.formatDate(it.original.dataVerificada) };
                    this.sheet["G" + this.curRow] = { v: it.original.potenciaDisponivel };
                }
                this.sheet["H" + this.curRow] = { v: util.secondToHour(dadosComuns.duracaoEmSegundos) };

                var tpparam = containTipo ? dadosComuns.tiposParametrosComputados[i] : "";

                this.sheet["I" + this.curRow] = { v: tpparam };
                this.sheet["J" + this.curRow] = { v: it.tipo_comparacao };

                if (it.reproducao) {

                    this.sheet["K" + this.curRow] = { v: util.textToExcel(it.reproducao.idEstadoOperativo) };
                    this.sheet["L" + this.curRow] = { v: util.textToExcel(it.reproducao.idCondicaoOperativa) };
                    this.sheet["M" + this.curRow] = { v: util.textToExcel(it.reproducao.idClassificacaoOrigem) };
                    this.sheet["N" + this.curRow] = { v: util.formatDate(it.reproducao.dataVerificada) };
                    this.sheet["O" + this.curRow] = { v: it.reproducao.potenciaDisponivel };
                }
            }

        });
    }

    parse() {

        this.parseContent();

        var wsdata = [];
        for(var i=0;i<this.curRow;i++) {
            wsdata.push([]);
        }
        Object.keys(this.sheet).map(p => {
            var celAdd = XLSX.utils.decode_cell(p);
            wsdata[celAdd.r][celAdd.c] = this.sheet[p].v;
        });

        let workSheet = XLSX.utils.aoa_to_sheet(wsdata);

        Object.keys(this.sheet).map(p => workSheet[p] = this.sheet[p]);

        this.workbook.SheetNames.push('reproducao');
        this.workbook.Sheets['reproducao'] = workSheet;

        var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
        var contentXlsx = XLSX.write(this.workbook, wopts);

        return contentXlsx;
    }
}

function headerReproducao(text) {
    return { v: "[R] " + text };
}

function header(text) {
    return { v: text };
}

/**
 * @constant configTaxaTeip
 * @description informações especfíficas para o parse do tipo TEIP
 */
const configTaxaTeip = {
    title: "Taxa equivalente de indisponibilidade Programada – TEIP",
    header_tiposparametros: [
        { col: "F10", text: header(TipoParametro.HDP) },
        { col: "G10", text: header(TipoParametro.HEDP) },
        { col: "H10", text: header(TipoParametro.HP) },
        { col: "I10", text: headerReproducao(TipoParametro.HDP) },
        { col: "J10", text: headerReproducao(TipoParametro.HEDP) },
        { col: "K10", text: headerReproducao(TipoParametro.HP) }
    ],
    cols_tiposparametros: [
        { columnLetter: "F", tipoParametro: TipoParametro.HDP, isoriginal: true },
        { columnLetter: "G", tipoParametro: TipoParametro.HEDP, isoriginal: true },
        { columnLetter: "H", tipoParametro: TipoParametro.HP, isoriginal: true },
        { columnLetter: "I", tipoParametro: TipoParametro.HDP, isoriginal: false },
        { columnLetter: "J", tipoParametro: TipoParametro.HEDP, isoriginal: false },
        { columnLetter: "K", tipoParametro: TipoParametro.HP, isoriginal: false }
    ]
}

/**
 * @constant configTaxaTeifa
 * @description informações especfíficas para o parse do tipo TEIFA
 */
const configTaxaTeifa = {
    title: "Taxa equivalente de indisponibilidade forçada apurada - Teifa",
    header_tiposparametros: [
        { col: "F10", text: header(TipoParametro.HDF) },
        { col: "G10", text: header(TipoParametro.HEDF) },
        { col: "H10", text: header(TipoParametro.HS) },
        { col: "I10", text: header(TipoParametro.HRD) },
        { col: "J10", text: header(TipoParametro.HDCE) },
        { col: "K10", text: headerReproducao(TipoParametro.HDF) },
        { col: "L10", text: headerReproducao(TipoParametro.HEDF) },
        { col: "M10", text: headerReproducao(TipoParametro.HS) },
        { col: "N10", text: headerReproducao(TipoParametro.HRD) },
        { col: "O10", text: headerReproducao(TipoParametro.HDCE) }
    ],
    cols_tiposparametros: [
        { columnLetter: "F", tipoParametro: TipoParametro.HDF, isoriginal: true },
        { columnLetter: "G", tipoParametro: TipoParametro.HEDF, isoriginal: true },
        { columnLetter: "H", tipoParametro: TipoParametro.HS, isoriginal: true },
        { columnLetter: "I", tipoParametro: TipoParametro.HRD, isoriginal: true },
        { columnLetter: "J", tipoParametro: TipoParametro.HDCE, isoriginal: true },
        { columnLetter: "K", tipoParametro: TipoParametro.HDF, isoriginal: false },
        { columnLetter: "L", tipoParametro: TipoParametro.HEDF, isoriginal: false },
        { columnLetter: "M", tipoParametro: TipoParametro.HS, isoriginal: false },
        { columnLetter: "N", tipoParametro: TipoParametro.HRD, isoriginal: false },
        { columnLetter: "O", tipoParametro: TipoParametro.HDCE, isoriginal: false }
    ]
}

/**
 * @description Obtém uma instância do parser, do resultado da reprodução, com o template excel
 * para geração da planilha de conferência dos dados utilizados.
 * 
 * @param {ResultadoComparacaoMemoriaCalculoTaxa} resultado 
 */
module.exports.factory = function (resultado) {

    var taxa = resultado.taxaComparacao.original;

    var configTaxa = taxa.idTipoTaxa == TipoTaxa.TEIPmes || taxa.idTipoTaxa == TipoTaxa.TEIPacum? configTaxaTeip : configTaxaTeifa;

    return new ParseResultadoReproducaoFile(resultado, configTaxa);
}
