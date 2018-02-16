describe('MemoriaProcesssamentoController: ', function () {
    let MemoriaProcesssamentoController = require('../controllers/memoriaprocessamentocontroller');
    let ParserXlsx = require('../controllers/parse/parsexlsx');
    let config = require('../config');
    let memoriaProcesssamentoController;

    beforeEach(function () {
        memoriaProcesssamentoController = new MemoriaProcesssamentoController();

    });

    it('Verifica o parser da memória de processamento está atribuindo os valores nas posições corretas na TEIP.', function () {

        var idUsina = "ALUX";

        var uge = {};
        uge.idUge = "1";
        uge.dataInicioOperacao = new Date();
        uge.potenciaDisponivel = 527;
        uge.idUsina = idUsina;

        var taxa = { id: "1", idTipoTaxa: "TEIPmes", valorTaxa: 10 };
        var fechamento = { id: "1", mes: 9, ano: 2014 };

        var eventos = static_mass_0UG6_09_2014(uge);
        var context = { event: { payload: { "idUsina": idUsina } }, dataset: { entities: {} } };

        context.dataset.entities.unidadegeradora = [uge];

        var parametro1 = {
            id: "1", valorParametro: 10, idTipoParametro: "HP", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro2 = {
            id: "2", valorParametro: 11, idTipoParametro: "HDP", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro3 = {
            id: "3", valorParametro: 12, idTipoParametro: "HEDP", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        context.dataset.entities.parametrotaxa = [parametro1, parametro2, parametro3];
        context.dataset.entities.fechamentomensal = [fechamento];
        context.dataset.entities.eventomudancaestadooperativo = eventos;

        var parser = ParserXlsx.factory(context, taxa);

        var workbook = parser.parse();

        var sheet = parser.sheet;

        expect(sheet["B2"].v).toBe(idUsina);
        expect(sheet["B5"].v).toBe(taxa.valorTaxa);
        expect(sheet["B6"].v).toBe("09/2014");

        expect(sheet["A10"].v).toBe("1");
        expect(sheet["B10"].v).toBe(fechamento.mes);
        expect(sheet["C10"].v).toBe(fechamento.ano);
        expect(sheet["E10"].v).toBe(uge.potenciaDisponivel);

        expect(sheet["F10"].v).toBe(parametro2.valorParametro);
        expect(sheet["G10"].v).toBe(parametro3.valorParametro);
        expect(sheet["H10"].v).toBe(parametro1.valorParametro);

        expect(sheet["J10"].v).toBe(eventos[0].idEvento);
        expect(sheet["J" + (eventos.length + 9)].v).toBe(eventos[eventos.length - 1].idEvento);

    });

    it('Verifica o parser da memória de processamento está atribuindo os valores nas posições corretas na TEIP acumulada.', function () {

        var idUsina = "ALUX";

        var uge = {};
        uge.idUge = "1";
        uge.dataInicioOperacao = new Date();
        uge.potenciaDisponivel = 527;
        uge.idUsina = idUsina;

        var taxa = { id: "1", idTipoTaxa: "TEIPac", valorTaxa: 10 };
        var fechamento = { id: "1", mes: 9, ano: 2014 };

        var eventos = static_mass_0UG6_09_2014(uge);
        var context = { event: { payload: { "idUsina": idUsina } }, dataset: { entities: {} } };

        context.dataset.entities.unidadegeradora = [uge];

        var parametro1 = {
            id: "1", valorParametro: 10, idTipoParametro: "HP", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro2 = {
            id: "2", valorParametro: 10, idTipoParametro: "HDP", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro3 = {
            id: "3", valorParametro: 10, idTipoParametro: "HEDP", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        context.dataset.entities.parametrotaxa = [parametro1, parametro2, parametro3];
        context.dataset.entities.fechamentomensal = [fechamento];
        context.dataset.entities.eventomudancaestadooperativo = eventos;

        var parser = ParserXlsx.factory(context, taxa);

        var workbook = parser.parse();

        var sheet = parser.sheet;

        expect(sheet["B2"].v).toBe(idUsina);
        expect(sheet["B5"].v).toBe(taxa.valorTaxa);
        expect(sheet["B6"].v).toBe("09/2014");

        expect(sheet["A10"].v).toBe("1");
        expect(sheet["B10"].v).toBe(fechamento.mes);
        expect(sheet["C10"].v).toBe(fechamento.ano);
        expect(sheet["E10"].v).toBe(uge.potenciaDisponivel);

        expect(sheet["F10"].v).toBe(parametro2.valorParametro);
        expect(sheet["G10"].v).toBe(parametro3.valorParametro);
        expect(sheet["H10"].v).toBe(parametro1.valorParametro);

        expect(sheet["J10"].v).toBe(eventos[0].idEvento);
        expect(sheet["J" + (eventos.length + 9)].v).toBe(eventos[eventos.length - 1].idEvento);

        // verificar se é acumulada
        expect(sheet["G1"].v).toBe("Acumulada");

    });

    it('Verifica o parser da memória de processamento está atribuindo os valores nas posições corretas na TEIFa.', function () {

        var idUsina = "ALUX";

        var uge = {};
        uge.idUge = "1";
        uge.dataInicioOperacao = new Date();
        uge.potenciaDisponivel = 527;
        uge.idUsina = idUsina;

        var taxa = { id: "1", idTipoTaxa: "TEIFAmes", valorTaxa: 10 };
        var fechamento = { id: "1", mes: 9, ano: 2014 };

        var eventos = static_mass_0UG6_09_2014(uge);
        var context = { event: { payload: { "idUsina": idUsina } }, dataset: { entities: {} } };

        context.dataset.entities.unidadegeradora = [uge];

        var parametro1 = {
            id: "1", valorParametro: 10, idTipoParametro: "HDF", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro2 = {
            id: "2", valorParametro: 11, idTipoParametro: "HEDF", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro3 = {
            id: "3", valorParametro: 12, idTipoParametro: "HS", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro4 = {
            id: "3", valorParametro: 13, idTipoParametro: "HRD", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro5 = {
            id: "3", valorParametro: 14, idTipoParametro: "HDCE", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        context.dataset.entities.parametrotaxa = [parametro1, parametro2, parametro3, parametro4, parametro5];
        context.dataset.entities.fechamentomensal = [fechamento];
        context.dataset.entities.eventomudancaestadooperativo = eventos;

        var parser = ParserXlsx.factory(context, taxa);

        var workbook = parser.parse();

        var sheet = parser.sheet;

        expect(sheet["B2"].v).toBe(idUsina);
        expect(sheet["B5"].v).toBe(taxa.valorTaxa);
        expect(sheet["B6"].v).toBe("09/2014");

        expect(sheet["A10"].v).toBe("1");
        expect(sheet["B10"].v).toBe(fechamento.mes);
        expect(sheet["C10"].v).toBe(fechamento.ano);
        expect(sheet["E10"].v).toBe(uge.potenciaDisponivel);

        expect(sheet["F10"].v).toBe(parametro1.valorParametro);
        expect(sheet["G10"].v).toBe(parametro2.valorParametro);
        expect(sheet["H10"].v).toBe(parametro3.valorParametro);
        expect(sheet["I10"].v).toBe(parametro4.valorParametro);
        expect(sheet["J10"].v).toBe(parametro5.valorParametro);

        expect(sheet["L10"].v).toBe(eventos[0].idEvento);
        expect(sheet["L" + (eventos.length + 9)].v).toBe(eventos[eventos.length - 1].idEvento);

    });


    it('Verifica o parser da memória de processamento está atribuindo os valores nas posições corretas na TEIFa. aumulada', function () {

        var idUsina = "ALUX";

        var uge = {};
        uge.idUge = "1";
        uge.dataInicioOperacao = new Date();
        uge.potenciaDisponivel = 527;
        uge.idUsina = idUsina;

        var taxa = { id: "1", idTipoTaxa: "TEIFAac", valorTaxa: 10 };
        var fechamento = { id: "1", mes: 9, ano: 2014 };

        var eventos = static_mass_0UG6_09_2014(uge);
        var context = { event: { payload: { "idUsina": idUsina } }, dataset: { entities: {} } };

        context.dataset.entities.unidadegeradora = [uge];

        var parametro1 = {
            id: "1", valorParametro: 10, idTipoParametro: "HDF", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro2 = {
            id: "2", valorParametro: 11, idTipoParametro: "HEDF", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro3 = {
            id: "3", valorParametro: 12, idTipoParametro: "HS", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro4 = {
            id: "3", valorParametro: 13, idTipoParametro: "HRD", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        var parametro5 = {
            id: "3", valorParametro: 14, idTipoParametro: "HDCE", idUge: uge.idUge,
            idFechamento: fechamento.id, idExecucaoCalculoFechamento: "1", mes: 9, ano: 2014
        };

        context.dataset.entities.parametrotaxa = [parametro1, parametro2, parametro3, parametro4, parametro5];
        context.dataset.entities.fechamentomensal = [fechamento];
        context.dataset.entities.eventomudancaestadooperativo = eventos;

        var parser = ParserXlsx.factory(context, taxa);

        var workbook = parser.parse();

        var sheet = parser.sheet;

        expect(sheet["B2"].v).toBe(idUsina);
        expect(sheet["B5"].v).toBe(taxa.valorTaxa);
        expect(sheet["B6"].v).toBe("09/2014");

        expect(sheet["A10"].v).toBe("1");
        expect(sheet["B10"].v).toBe(fechamento.mes);
        expect(sheet["C10"].v).toBe(fechamento.ano);
        expect(sheet["E10"].v).toBe(uge.potenciaDisponivel);

        expect(sheet["F10"].v).toBe(parametro1.valorParametro);
        expect(sheet["G10"].v).toBe(parametro2.valorParametro);
        expect(sheet["H10"].v).toBe(parametro3.valorParametro);
        expect(sheet["I10"].v).toBe(parametro4.valorParametro);
        expect(sheet["J10"].v).toBe(parametro5.valorParametro);

        expect(sheet["L10"].v).toBe(eventos[0].idEvento);
        expect(sheet["L" + (eventos.length + 9)].v).toBe(eventos[eventos.length - 1].idEvento);

        // verificar se é acumulada
        expect(sheet["G1"].v).toBe("Acumulada");
    });

});

function static_mass_0UG6_09_2014(uge) {

    uge.potenciaDisponivel = 527;

    var evtEstOper1 = {};
    evtEstOper1.idEstadoOperativo = "DCO";
    evtEstOper1.idCondicaoOperativa = "TST";
    evtEstOper1.potenciaDisponivel = 527;
    evtEstOper1.dataVerificada = new Date(2014, 8, 1, 0, 0);

    var evtEstOper2 = {};
    evtEstOper2.idEstadoOperativo = "DEM";
    evtEstOper2.idClassificacaoOrigem = "GUM";
    evtEstOper2.potenciaDisponivel = 0;
    evtEstOper2.dataVerificada = new Date(2014, 8, 13, 8, 8);

    var evtEstOper3 = {};
    evtEstOper3.idEstadoOperativo = "DCO";
    evtEstOper3.idCondicaoOperativa = "TST";
    evtEstOper3.potenciaDisponivel = 527;
    evtEstOper3.dataVerificada = new Date(2014, 8, 13, 11, 54);

    var evtEstOper4 = {};
    evtEstOper4.idEstadoOperativo = "LIG";
    evtEstOper4.idCondicaoOperativa = "RFO";
    evtEstOper4.idClassificacaoOrigem = "GUM";
    evtEstOper4.potenciaDisponivel = 32;
    evtEstOper4.dataVerificada = new Date(2014, 8, 17, 7, 9);

    var evtEstOper5 = {};
    evtEstOper5.idEstadoOperativo = "DEM";
    evtEstOper5.idClassificacaoOrigem = "GTR";
    evtEstOper5.potenciaDisponivel = 0;
    evtEstOper5.dataVerificada = new Date(2014, 8, 17, 7, 31);

    var evtEstOper6 = {};
    evtEstOper6.idEstadoOperativo = "DCO";
    evtEstOper6.idCondicaoOperativa = "TST";
    evtEstOper6.potenciaDisponivel = 527;
    evtEstOper6.dataVerificada = new Date(2014, 8, 17, 11, 42);

    var evtEstOper7 = {};
    evtEstOper7.idEstadoOperativo = "LIG";
    evtEstOper7.idCondicaoOperativa = "RFO";
    evtEstOper7.idClassificacaoOrigem = "GUM";
    evtEstOper7.potenciaDisponivel = 420;
    evtEstOper7.dataVerificada = new Date(2014, 8, 17, 17, 46);

    var evtEstOper8 = {};
    evtEstOper8.idEstadoOperativo = "LIG";
    evtEstOper8.idCondicaoOperativa = "NOT";
    evtEstOper8.potenciaDisponivel = 527;
    evtEstOper8.dataVerificada = new Date(2014, 8, 17, 23, 0);

    var evtEstOper9 = {};
    evtEstOper9.idEstadoOperativo = "LIG";
    evtEstOper9.idCondicaoOperativa = "NOR";
    evtEstOper9.potenciaDisponivel = 527;
    evtEstOper9.dataVerificada = new Date(2014, 8, 18, 3, 0);

    var evtEstOper10 = {};
    evtEstOper10.idEstadoOperativo = "DCO";
    evtEstOper10.idCondicaoOperativa = "NOR";
    evtEstOper10.potenciaDisponivel = 527;
    evtEstOper10.dataVerificada = new Date(2014, 8, 19, 11, 22);

    var retorno = [evtEstOper1, evtEstOper2, evtEstOper3, evtEstOper4, evtEstOper5,
        evtEstOper6, evtEstOper7, evtEstOper8, evtEstOper9, evtEstOper10];

    return retorno;
}