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
class ParseMemoryFileTemplate {

    constructor(context, taxa, suffixNameFile, colsEvent, colsTipoParametro) {

        this.suffixNameFile = suffixNameFile;

        var filePath = "./templates/templatememoria_" + this.suffixNameFile + ".xlsx";
        this.workbook = XLSX.readFileSync(filePath);

        this.sheet = this.workbook.Sheets.memoria_calculo;
        this.context = context;
        this.taxa = taxa;

        this.colsEvent = colsEvent;
        this.colsTipoParametro = colsTipoParametro;
    }

    recoverData() {

        this.parametros = Enumerable.from(this.context.dataset.entities.parametrotaxa);
        this.uges = Enumerable.from(this.context.dataset.entities.unidadegeradora)

        var grpArray = [];
        var grpParam = Enumerable.from(grpArray);
        this.parametros.forEach(it => {
            if (!grpParam.any(grp => { return grp.idUge == it.idUge && grp.mes == it.mes && grp.ano == it.ano })) {
                grpArray.push({ idUge: it.idUge, mes: it.mes, ano: it.ano });
            }
        });

        grpParam = grpParam.orderByDescending(it => { return it.ano + "-" + it.mes.zeroFillLeft(2) });
        this.grpParam = grpParam;

        this.idUsina = this.context.event.payload.idUsina;
        this.evtEstOpers = Enumerable.from(this.context.dataset.entities.eventomudancaestadooperativo).orderByDescending(
            it => { return it.dataVerificada });

        if (this.context.dataset.entities.execucaocalculofechamento) {
            this.execucaoCalculo = Enumerable.from(this.context.dataset.entities.execucaocalculofechamento).firstOrDefault();
        }

        this.fechamento = Enumerable.from(this.context.dataset.entities.fechamentomensal).firstOrDefault();
    }

    getParametroByItemGroup(itemGroup, tipoParametro) {
        return this.parametros.first(p => {
            return p.idUge == itemGroup.idUge && p.mes == itemGroup.mes && p.ano == itemGroup.ano
                && p.idTipoParametro == tipoParametro
        });
    }

    parseContent() {

        this.recoverData();

        this.sheet["B2"] = { v: this.idUsina };

        if (this.execucaoCalculo) {
            this.sheet["B3"] = { v: this.execucaoCalculo.protocolo };
            this.sheet["B4"] = { v: util.formatDate(this.execucaoCalculo.dataInicio) };
        }

        this.sheet["B5"] = { v: this.taxa.valorTaxa };

        this.sheet["B6"] = { v: (this.fechamento.mes.zeroFillLeft(2) + "/" + this.fechamento.ano) };

        // TODO this.sheet["B7"] info de cenário, quando tiver o caso de uso de cenário.

        // indica se a taxa se trata de taxa acumulada
        if (this.taxa.idTipoTaxa == TipoTaxa.TEIPacum || this.taxa.idTipoTaxa == TipoTaxa.TEIFAacum) {
            this.sheet["G1"] = { v: "Acumulada" };
        }

        this.parseParametros();

        this.parseEventos();

    }

    parseParametros() {

        // UGE_ID	Mês	Ano	Iníco Oper	P
        var curRow = 10;
        this.grpParam.forEach(it => {

            var uge = this.uges.first(ug => { return ug.idUge == it.idUge });

            this.sheet["A" + curRow] = { v: it.idUge };
            this.sheet["B" + curRow] = { v: it.mes };
            this.sheet["C" + curRow] = { v: it.ano };
            this.sheet["D" + curRow] = { v: util.formatDate(uge.dataInicioOperacao) };
            this.sheet["E" + curRow] = { v: uge.potenciaDisponivel };

            this.colsTipoParametro.forEach(ct => {

                var param = this.getParametroByItemGroup(it, ct.tipoParametro);

                this.sheet[ct.columnLetter + curRow] = { v: util.numberToExcel(param.valorParametro) };
            });

            curRow++;
        });
    }

    parseEventos() {
        // Parse dos eventos
        var curRow = 10;
        this.evtEstOpers.forEach(it => {

            var containTipo = it.tiposParametrosComputados && it.tiposParametrosComputados.length > 0;
            var qtdTipos = containTipo ? it.tiposParametrosComputados.length : 1;

            for (var i = 0; i < qtdTipos; i++, curRow++) {
                
                this.sheet[this.colsEvent[0] + curRow] = { v: it.numONS };
                this.sheet[this.colsEvent[1] + curRow] = { v: it.idUge };
                this.sheet[this.colsEvent[2] + curRow] = { v: util.textToExcel(it.idEstadoOperativo) };
                this.sheet[this.colsEvent[3] + curRow] = { v: util.textToExcel(it.idCondicaoOperativa) };
                this.sheet[this.colsEvent[4] + curRow] = { v: util.textToExcel(it.idClassificacaoOrigem) };
                this.sheet[this.colsEvent[5] + curRow] = { v: util.formatDate(it.dataVerificada) };
                this.sheet[this.colsEvent[6] + curRow] = { v: it.potenciaDisponivel ? it.potenciaDisponivel : 0 };
                this.sheet[this.colsEvent[7] + curRow] = { v: util.secondToHour(it.duracaoEmSegundos) };

                var tpparam = containTipo ? it.tiposParametrosComputados[i] : "";

                this.sheet[this.colsEvent[8] + curRow] = { v: tpparam };

                this.sheet[this.colsEvent[9] + curRow] = { v: it.eversao };
            }

        });
    }

    parse() {

        this.parseContent();

        var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
        var contentXlsx = XLSX.write(this.workbook, wopts);

        return contentXlsx;
    }
}

/**
 * @constant teipMetadata
 * @description informações especfíficas para o parse do tipo TEIP
 */
const teipMetadata = {
    suffixNameFile: "teip",
    colsEvent: ["J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
    colsTipoParametro: [
        { columnLetter: "F", tipoParametro: TipoParametro.HDP },
        { columnLetter: "G", tipoParametro: TipoParametro.HEDP },
        { columnLetter: "H", tipoParametro: TipoParametro.HP }
    ]
}

/**
 * @constant teifaMetadata
 * @description informações especfíficas para o parse do tipo TEIFA
 */
const teifaMetadata = {
    suffixNameFile: "teifa",
    colsEvent: ["L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"],
    colsTipoParametro: [
        { columnLetter: "F", tipoParametro: TipoParametro.HDF },
        { columnLetter: "G", tipoParametro: TipoParametro.HEDF },
        { columnLetter: "H", tipoParametro: TipoParametro.HS },
        { columnLetter: "I", tipoParametro: TipoParametro.HRD },
        { columnLetter: "J", tipoParametro: TipoParametro.HDCE }
    ]
}

/**
 * @description Obtém uma instância do parser, da memória de cálculo de taxas, com o template excel
 * para geração da planilha de conferência dos dados utilizados.
 * 
 * @param {context} context 
 * @param {Taxa} taxa 
 */
module.exports.factory = function (context, taxa) {

    var retorno;
    if (taxa.idTipoTaxa == TipoTaxa.TEIPmes || taxa.idTipoTaxa == TipoTaxa.TEIPacum) {
        retorno = new ParseMemoryFileTemplate(
            context, taxa, teipMetadata.suffixNameFile,
            teipMetadata.colsEvent, teipMetadata.colsTipoParametro
        );
    }
    else if (taxa.idTipoTaxa == TipoTaxa.TEIFAmes || taxa.idTipoTaxa == TipoTaxa.TEIFAacum) {
        retorno = new ParseMemoryFileTemplate(
            context, taxa, teifaMetadata.suffixNameFile,
            teifaMetadata.colsEvent, teifaMetadata.colsTipoParametro
        );
    }
    return retorno;
}
