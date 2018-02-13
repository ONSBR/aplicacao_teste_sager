var EventoMudancaEstadoOperativo = require("../process/entities/eventomudancaestadooperativo");
var UnidadeGeradora = require("../process/entities/unidadegeradora");
var ClassificacaoOrigem = require("../process/business/constants").ClassificacaoOrigem;
var CondicaoOperativa = require("../process/business/constants").CondicaoOperativa;
var EstadoOperativo = require("../process/business/constants").EstadoOperativo;
var staticDataMass = require("./testMass/staticdatamass");
var CalculoParametroHDF = require("../process/business/parametros/calculoparametrohdf");
var CalculoParametroHEDF = require("../process/business/parametros/calculoparametrohedf");
var CalculoParametroHP = require("../process/business/parametros/calculoparametrohp");
var CalculoParametroHS = require("../process/business/parametros/calculoparametrohs");
var CalculoParametroHRD = require("../process/business/parametros/calculoparametrohrd");
var CalculoParametroHDP = require("../process/business/parametros/calculoparametrohdp");
var PeriodoCalculo = require("../process/business/periodocalculo");
var utils = require("../utils");
var utilTest = require("./utiltest");

describe('O SAGER deve calcular as taxas TEIFA e TEIP', function () {

    // #region calculo HDF

    it('validar calculo parâmetro HDF', () => {
        
        var eventoDAUHDF = new EventoMudancaEstadoOperativo();
        eventoDAUHDF.idClassificacaoOrigem = ClassificacaoOrigem.GUM;
        eventoDAUHDF.idEstadoOperativo = EstadoOperativo.DAU;
        eventoDAUHDF.dataVerificada = new Date(2017, 1, 1, 0, 0, 0);

        var eventoDEMHDF = new EventoMudancaEstadoOperativo();
        eventoDEMHDF.idClassificacaoOrigem = ClassificacaoOrigem.GGE; 
        eventoDEMHDF.idEstadoOperativo = EstadoOperativo.DAU;
        eventoDEMHDF.dataVerificada = new Date(2017, 1, 2, 0, 0, 0);

        var eventoNaoHDF = new EventoMudancaEstadoOperativo();
        eventoNaoHDF.idClassificacaoOrigem = ClassificacaoOrigem.GCI;
        eventoNaoHDF.idEstadoOperativo = EstadoOperativo.DPR;
        eventoNaoHDF.dataVerificada = new Date(2017, 1, 3, 0, 0, 0);

        var eventoDAUHDF2 = utils.clone(eventoDAUHDF);
        eventoDAUHDF2.dataVerificada = new Date(2017, 1, 4, 0, 0, 0);

        var eventoNaoHDF2 = utils.clone(eventoNaoHDF);
        eventoNaoHDF2.dataVerificada = new Date(2017, 1, 5, 12, 30, 0);
        
        var calculo = CalculoParametroHDF.factory();

        var listEventos = [eventoDAUHDF, eventoDEMHDF, eventoNaoHDF, eventoDAUHDF2, eventoNaoHDF2];
        listEventos.forEach(element => {
            EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(element);
            calculo.computarEvento(element);    
        });

        var qtdHoras = calculo.qtdHoras;

        expect(qtdHoras).toEqual(84.5);

    })


    it('validar cálculo parâmetro HDF finalização fim do mês', () => {
        
        var eventoDAUHDF = new EventoMudancaEstadoOperativo();
        eventoDAUHDF.idClassificacaoOrigem = ClassificacaoOrigem.GUM;
        eventoDAUHDF.idEstadoOperativo = EstadoOperativo.DAU;
        eventoDAUHDF.dataVerificada = new Date(2017, 1, 1, 0, 0, 0);

        var eventoDEMHDF = new EventoMudancaEstadoOperativo();
        eventoDEMHDF.idClassificacaoOrigem = ClassificacaoOrigem.GGE; 
        eventoDEMHDF.idEstadoOperativo = EstadoOperativo.DAU;
        eventoDEMHDF.dataVerificada = new Date(2017, 1, 2, 0, 0, 0);

        var eventoNaoHDF = new EventoMudancaEstadoOperativo();
        eventoNaoHDF.idClassificacaoOrigem = ClassificacaoOrigem.GCI;
        eventoNaoHDF.idEstadoOperativo = EstadoOperativo.DPR;
        eventoNaoHDF.dataVerificada = new Date(2017, 1, 3, 0, 0, 0);

        var eventoDAUHDF2 = utils.clone(eventoDAUHDF);
        eventoDAUHDF2.dataVerificada = new Date(2017, 1, 4, 0, 0, 0);

        var eventoFinalizacao = new EventoMudancaEstadoOperativo();
        eventoFinalizacao.dataVerificada = new Date(2017, 1, 31, 59, 59, 59);
        
        var calculo = CalculoParametroHDF.factory();

        var listEventos = [eventoDAUHDF, eventoDEMHDF, eventoNaoHDF, eventoDAUHDF2, eventoFinalizacao];
        listEventos.forEach(element => {
            EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(element);
            calculo.computarEvento(element);    
        });

        var qtdHoras = utils.round(calculo.qtdHoras, 2);

        expect(qtdHoras).toEqual(756);

    })

    // #endregion calculo HDF
 
    // #region calculo HP

    it('validar cálculo parâmetro HP para o mês inteiro.', () => {
        
        var mes = 1;
        var ano = 2017;

        var uge = new UnidadeGeradora();
        uge.dataInicioOperacao = new Date(2016, 0, 1);

        var calculo = CalculoParametroHP.factory(uge);
        calculo.calcular(new PeriodoCalculo(mes, ano));
        
        expect(calculo.qtdHoras).toEqual(744);

    })

    it('validar cálculo parâmetro HP para o mês, a partir do início de operacao da uge.', () => {
        
        var mes = 1;
        var ano = 2017;

        var uge = new UnidadeGeradora();
        uge.dataInicioOperacao = new Date(2017, 0, 2, 16);

        var calculo = CalculoParametroHP.factory(uge);
        calculo.calcular(new PeriodoCalculo(mes, ano));
        
        expect(calculo.qtdHoras).toEqual(704);

    })

    it('validar cálculo parâmetro HP para o mês, 09/2014, uge 0UG6.', () => {
        
        var mes = 9;
        var ano = 2017;

        var uge = new UnidadeGeradora();
        uge.dataInicioOperacao = new Date(1994, 4, 30, 0);

        var calculo = CalculoParametroHP.factory(uge);
        calculo.calcular(new PeriodoCalculo(mes, ano));
        
        expect(calculo.qtdHoras).toEqual(720);

    })

    // #endregion calculo HP    

    it('validar cálculo parâmetro HEDF da massa em 09/2014, uge 0UG6', () => {
        
        utilTest.testarCalculoEventos(9, 2014, staticDataMass.static_mass_0UG6_09_2014, CalculoParametroHEDF.factory, 1.41);
        
    })

    it('validar cálculo parâmetro HS da massa em 09/2014, uge 0UG6', () => {
        
        utilTest.testarCalculoEventos(9, 2014, staticDataMass.static_mass_0UG6_09_2014, CalculoParametroHS.factory, 41.97);

    })

    it('validar cálculo parâmetro HRD da massa em 09/2014, uge 0UG6', () => {
        
        utilTest.testarCalculoEventos(9, 2014, staticDataMass.static_mass_0UG6_09_2014, CalculoParametroHRD.factory, 670.08);

    })
    
    it('validar cálculo parâmetro HDP da massa em 09/2014, uge 0UG6', () => {
        
        utilTest.testarCalculoEventos(9, 2014, staticDataMass.static_mass_0UG6_09_2014, CalculoParametroHDP.factory, 0);

    })

    it('validar cálculo parâmetro HDP da massa em 07/2014, uge 0UG3', () => {
        
        utilTest.testarCalculoEventos(7, 2014, staticDataMass.static_mass_0UG3_07_2014, CalculoParametroHDP.factory, 256.23);

    })
});
            
