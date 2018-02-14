const Enumerable = require('linq');
const XLSX = require('xlsx');
const util = require('../../util');


class ParseFileTemplate {

    constructor(context, taxa) {

        var filePath = "./templates/templatememoria_" + this.suffixNameFile + ".xlsx";
        this.workbook = XLSX.readFileSync(filePath);

        this.sheet = this.workbook.Sheets.memoria_calculo;
        this.context = context;
        this.taxa = taxa;
    }

    get suffixNameFile() { }

    parseContent(colsEvent) {

        var idUsina = this.context.event.payload.idUsina;
        var evtEstOpers = Enumerable.from(this.context.dataset.entities.eventomudancaestadooperativo).orderByDescending(
            it => {return it.dataVerificada});

        this.sheet["B2"] = { v: idUsina };
        
        if (this.context.dataset.entities.execucaocalculofechamento) {
            var execucaoCalculo = Enumerable.from(this.context.dataset.entities.execucaocalculofechamento).firstOrDefault();
            if (execucaoCalculo) {
                this.sheet["B3"] = { v: execucaoCalculo.protocolo };
                this.sheet["B4"] = { v: util.formatDate(execucaoCalculo.dataInicio) };
            }
        }

        this.sheet["B5"] = { v: this.taxa.valorTaxa };

        var fechamento = Enumerable.from(this.context.dataset.entities.fechamentomensal).firstOrDefault();
        this.sheet["B6"] = { v: (fechamento.mes.zeroFillLeft(2) + "/" + fechamento.ano) };

        // TODO this.sheet["B7"] info de cenário.

        // Parse dos eventos
        var curRow = 10;
        evtEstOpers.forEach(it => {

            this.sheet[colsEvent[0] + curRow] = { v: it.idEvento };
            this.sheet[colsEvent[1] + curRow] = { v: it.idUge };
            this.sheet[colsEvent[2] + curRow] = { v: util.valueToExcel(it.idTipoEstadoOperativo) };
            this.sheet[colsEvent[3] + curRow] = { v: util.valueToExcel(it.idCondicaoOperativa) };
            this.sheet[colsEvent[4] + curRow] = { v: util.valueToExcel(it.idClassificacaoOrigem) };
            this.sheet[colsEvent[5] + curRow] = { v: util.formatDate(it.dataVerificada) };
            this.sheet[colsEvent[6] + curRow] = { v: it.potenciaDisponivel };

            curRow++;
        });

    }

    parse() {

        this.parseContent();

        var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
        var contentXlsx = XLSX.write(this.workbook, wopts);

        return contentXlsx;
    }
}

class ParseTeipMes extends ParseFileTemplate {

    get suffixNameFile() {
        return "teip";
    }

    parseContent() {

        super.parseContent(["J", "K", "L", "M", "N", "O", "P"]);

        var parametros = Enumerable.from(this.context.dataset.entities.parametrotaxa);
        var uges = Enumerable.from(this.context.dataset.entities.unidadegeradora)

        var grpArray = [];
        var grpParam = Enumerable.from(grpArray);
        parametros.forEach(it => {
            if (!grpParam.any(grp => { return grp.idUge == it.idUge && grp.mes == it.mes && grp.ano == it.ano })) {
                grpArray.push({ idUge: it.idUge, mes: it.mes, ano: it.ano });
            }
        });

        grpParam = grpParam.orderByDescending(it => { return it.ano + "-" + it.mes.zeroFillLeft(2) });

        // UGE_ID	Mês	Ano	Iníco Oper	P	HDP	HEDP	HP
        var curRow = 10;
        grpParam.forEach(it => {

            var uge = uges.first(ug => { return ug.idUge == it.idUge });

            var paramHDP = parametros.first(p => {
                return p.idUge == it.idUge && p.mes == it.mes && p.ano == it.ano
                    && p.idTipoParametro == TipoParametro.HDP
            });
            var paramHEDP = parametros.first(p => {
                return p.idUge == it.idUge && p.mes == it.mes && p.ano == it.ano
                    && p.idTipoParametro == TipoParametro.HEDP
            });
            var paramHP = parametros.first(p => {
                return p.idUge == it.idUge && p.mes == it.mes && p.ano == it.ano
                    && p.idTipoParametro == TipoParametro.HP
            });

            this.sheet["A" + curRow] = { v: it.idUge };
            this.sheet["B" + curRow] = { v: it.mes };
            this.sheet["C" + curRow] = { v: it.ano };
            this.sheet["D" + curRow] = { d: util.formatDate(uge.dataInicioOperacao) };
            this.sheet["E" + curRow] = { v: uge.potenciaDisponivel };
            this.sheet["F" + curRow] = { v: util.valueToExcel(paramHDP.valorParametro) };
            this.sheet["G" + curRow] = { v: util.valueToExcel(paramHEDP.valorParametro) };
            this.sheet["H" + curRow] = { v: util.valueToExcel(paramHP.valorParametro) };

            curRow++;
        });
    }
}

class ParseTeifaMes extends ParseFileTemplate {

    get suffixNameFile() {
        return "teifa";
    }

    parseContent() {

        super.parseContent(["L", "M", "N", "O", "P", "Q", "R"]);

        var parametros = Enumerable.from(this.context.dataset.entities.parametrotaxa);
        var uges = Enumerable.from(this.context.dataset.entities.unidadegeradora)

        var grpArray = [];
        var grpParam = Enumerable.from(grpArray);
        parametros.forEach(it => {
            if (!grpParam.any(grp => { return grp.idUge == it.idUge && grp.mes == it.mes && grp.ano == it.ano })) {
                grpArray.push({ idUge: it.idUge, mes: it.mes, ano: it.ano });
            }
        });

        grpParam = grpParam.orderBy(it => { return it.idUge }).orderByDescending(it => it => { return it.ano + "-" + it.mes.zeroFillLeft(2) });

        // UGE_ID	Mês	Ano	Iníco Oper	P	HDF	HEDF	HS	HRD	HDCE
        var curRow = 10;
        grpParam.forEach(it => {

            var uge = uges.first(ug => { return ug.idUge == it.idUge });

            var paramHDF = parametros.first(p => {
                return p.idUge == it.idUge && p.mes == it.mes && p.ano == it.ano
                    && p.idTipoParametro == TipoParametro.HDF
            });
            var paramHEDF = parametros.first(p => {
                return p.idUge == it.idUge && p.mes == it.mes && p.ano == it.ano
                    && p.idTipoParametro == TipoParametro.HEDF
            });
            var paramHS = parametros.first(p => {
                return p.idUge == it.idUge && p.mes == it.mes && p.ano == it.ano
                    && p.idTipoParametro == TipoParametro.HS
            });
            var paramHRD = parametros.first(p => {
                return p.idUge == it.idUge && p.mes == it.mes && p.ano == it.ano
                    && p.idTipoParametro == TipoParametro.HRD
            });
            var paramHDCE = parametros.first(p => {
                return p.idUge == it.idUge && p.mes == it.mes && p.ano == it.ano
                    && p.idTipoParametro == TipoParametro.HDCE
            });

            this.sheet["A" + curRow] = { v: it.idUge };
            this.sheet["B" + curRow] = { v: it.mes };
            this.sheet["C" + curRow] = { v: it.ano };
            this.sheet["D" + curRow] = { v: util.formatDate(uge.dataInicioOperacao) };
            this.sheet["E" + curRow] = { v: uge.potenciaDisponivel };
            this.sheet["F" + curRow] = { v: util.valueToExcel(paramHDF.valorParametro) };
            this.sheet["G" + curRow] = { v: util.valueToExcel(paramHEDF.valorParametro) };
            this.sheet["H" + curRow] = { v: util.valueToExcel(paramHS.valorParametro) };
            this.sheet["I" + curRow] = { v: util.valueToExcel(paramHRD.valorParametro) };
            this.sheet["J" + curRow] = { v: util.valueToExcel(paramHDCE.valorParametro) };

            curRow++;
        });
    }
}

class ParseTeipAcum extends ParseTeipMes {

    parseContent() {
        super.parseContent();
        this.sheet["G1"] = { v: "Acumulada" };
    }
}

class ParseTeifaAcum extends ParseTeifaMes {

    parseContent() {
        super.parseContent();
        this.sheet["G1"] = { v: "Acumulada" };
    }
}

const TipoParametro = {
    HDF: "HDF",
    HEDF: "HEDF",
    HS: "HS",
    HRD: "HRD",
    HDCE: "HDCE",
    HDP: "HDP",
    HEDP: "HEDP",
    HP: "HP"
}

const TipoTaxa = {
    TEIPmes: "TEIPmes",
    TEIFAmes: "TEIFAmes",
    TEIPacum: "TEIPac",
    TEIFAacum: "TEIFAac"
}

module.exports.factory = function (context, taxa) {

    var retorno;
    if (taxa.idTipoTaxa == TipoTaxa.TEIPmes) {
        retorno = new ParseTeipMes(context, taxa);
    }
    else if (taxa.idTipoTaxa == TipoTaxa.TEIFAmes) {
        retorno = new ParseTeifaMes(context, taxa);
    }
    else if (taxa.idTipoTaxa == TipoTaxa.TEIPacum) {
        retorno = new ParseTeipAcum(context, taxa);
    }
    else if (taxa.idTipoTaxa == TipoTaxa.TEIFAacum) {
        retorno = new ParseTeifaAcum(context, taxa);
    }
    return retorno;
}
