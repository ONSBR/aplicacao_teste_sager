var EventoMudancaEstadoOperativo = require("../process/entities/eventoMudancaEstadoOperativo");
var UnidadeGeradora = require("../process/entities/unidadeGeradora");
var EstadoOperativo = require("../process/business/constants").EstadoOperativo;
var CondicaoOperativa = require("../process/business/constants").CondicaoOperativa;
var ClassificacaoOrigem = require("../process/business/constants").ClassificacaoOrigem;
var staticDataMass = require("./testMass/staticDataMass");
var CalculoParametroHDF = require("../process/business/parametros/calculoParametroHDF");
var CalculoParametroHEDF = require("../process/business/parametros/calculoParametroHEDF");
var CalculoParametroHS = require("../process/business/parametros/calculoParametroHS");
var CalculoParametroHDP = require("../process/business/parametros/calculoParametroHDP");
var utilTest = require("./utilTest");

describe('O SAGER deve calcular as taxas TEIFA e TEIP', function () {

    it('verificar evento valido para o tipo de parametro HDF', () => {
        
        var evtEstOper = new EventoMudancaEstadoOperativo();
        evtEstOper.idClassificacaoOrigem = ClassificacaoOrigem.GUM;
        evtEstOper.idEstadoOperativo = EstadoOperativo.DAU;
        evtEstOper.dataVerificada = new Date();
        
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper);

        var validado = new CalculoParametroHDF().validarEvento(evtEstOper);

        expect(validado).toBe(true);

    })

    it('verificar evento invalido para o tipo de parametro HDF', () => {
        
        var evtEstOperEstadoInvalido = new EventoMudancaEstadoOperativo();
        evtEstOperEstadoInvalido.dataVerificada = new Date();
        evtEstOperEstadoInvalido.idClassificacaoOrigem = ClassificacaoOrigem.GUM;
        evtEstOperEstadoInvalido.idEstadoOperativo = EstadoOperativo.DPR;

        var evtEstOperClassificacaoInvalida = new EventoMudancaEstadoOperativo();
        evtEstOperClassificacaoInvalida.dataVerificada = new Date();
        evtEstOperClassificacaoInvalida.idClassificacaoOrigem = ClassificacaoOrigem.GCI;
        evtEstOperClassificacaoInvalida.idEstadoOperativo = EstadoOperativo.DAU;

        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOperEstadoInvalido);
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOperClassificacaoInvalida);

        var validadoEstadoInvalido = new CalculoParametroHDF().validarEvento(evtEstOperEstadoInvalido);
        var validadoClassificacaoInvalida = new CalculoParametroHDF().validarEvento(evtEstOperClassificacaoInvalida);

        expect(validadoEstadoInvalido).toBe(false);
        expect(validadoClassificacaoInvalida).toBe(false);
    })

    it('verificar evento valido para o tipo de parametro HEDF', () => {
        
        var evtEstOper = new EventoMudancaEstadoOperativo();
        evtEstOper.idEstadoOperativo = EstadoOperativo.LIG;
        evtEstOper.idCondicaoOperativa = CondicaoOperativa.RFO;
        evtEstOper.idClassificacaoOrigem = ClassificacaoOrigem.GUM;
        evtEstOper.dataVerificada = new Date();
        
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper);

        var validado = new CalculoParametroHEDF().validarEvento(evtEstOper);

        expect(validado).toBe(true);

    })

    it('verificar eventos validos da massa em 09/2014, uge 0UG6, para o tipo de parametro HEDF', () => {
        
        utilTest.testarValidacaoEventosParametroCalculo(
            staticDataMass.static_mass_0UG6_09_2014, 
            CalculoParametroHEDF, 
            [false, false, false, true, false, false, true, false, false, false]
        );

    })

    it('verificar eventos validos da massa em 09/2014, uge 0UG6, para o tipo de parametro HS', () => {
        
        utilTest.testarValidacaoEventosParametroCalculo(
            staticDataMass.static_mass_0UG6_09_2014, 
            CalculoParametroHS, 
            [false, false, false, true, false, false, true, true, true, false]
        );

    })

    it('verificar evento valido para o tipo de parametro HDP', () => {
        
        var evtEstOper = new EventoMudancaEstadoOperativo();
        evtEstOper.idClassificacaoOrigem = ClassificacaoOrigem.GOT;
        evtEstOper.idEstadoOperativo = EstadoOperativo.DUR;
        evtEstOper.dataVerificada = new Date();
        
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper);

        var validado = new CalculoParametroHDP().validarEvento(evtEstOper);

        expect(validado).toBe(true);

    })

});
