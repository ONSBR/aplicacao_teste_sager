var EventoMudancaEstadoOperativo = require("../../process/entities/eventoMudancaEstadoOperativo");
var UnidadeGeradora = require("../../process/entities/unidadeGeradora");
var EstadoOperativo = require("../../process/business/constants").EstadoOperativo;
var CondicaoOperativa = require("../../process/business/constants").CondicaoOperativa;
var ClassificacaoOrigem = require("../../process/business/constants").ClassificacaoOrigem;


module.exports.static_mass_0UG6_09_2014 = function (uge) {

    uge.potenciaDisponivel = 527;

    var evtEstOper1 = new EventoMudancaEstadoOperativo();
    evtEstOper1.idEstadoOperativo = EstadoOperativo.DCO;
    evtEstOper1.idCondicaoOperativa = CondicaoOperativa.TST;
    evtEstOper1.potenciaDisponivel = 527;
    evtEstOper1.dataVerificada = new Date(2014, 8, 1, 0, 0);

    var evtEstOper2 = new EventoMudancaEstadoOperativo();
    evtEstOper2.idEstadoOperativo = EstadoOperativo.DEM;   
    evtEstOper2.idClassificacaoOrigem = ClassificacaoOrigem.GUM; 
    evtEstOper2.potenciaDisponivel = 0;
    evtEstOper2.dataVerificada = new Date(2014, 8, 13, 8, 8);

    var evtEstOper3 = new EventoMudancaEstadoOperativo();
    evtEstOper3.idEstadoOperativo = EstadoOperativo.DCO;
    evtEstOper3.idCondicaoOperativa = CondicaoOperativa.TST;
    evtEstOper3.potenciaDisponivel = 527;
    evtEstOper3.dataVerificada = new Date(2014, 8, 13, 11, 54);

    var evtEstOper4 = new EventoMudancaEstadoOperativo();
    evtEstOper4.idEstadoOperativo = EstadoOperativo.LIG;
    evtEstOper4.idCondicaoOperativa = CondicaoOperativa.RFO;
    evtEstOper4.idClassificacaoOrigem = ClassificacaoOrigem.GUM;
    evtEstOper4.potenciaDisponivel = 32;
    evtEstOper4.dataVerificada = new Date(2014, 8, 17, 7, 9);

    var evtEstOper5 = new EventoMudancaEstadoOperativo();
    evtEstOper5.idEstadoOperativo = EstadoOperativo.DEM;
    evtEstOper5.idClassificacaoOrigem = ClassificacaoOrigem.GTR;
    evtEstOper5.potenciaDisponivel = 0;
    evtEstOper5.dataVerificada = new Date(2014, 8, 17, 7, 31);

    var evtEstOper6 = new EventoMudancaEstadoOperativo();
    evtEstOper6.idEstadoOperativo = EstadoOperativo.DCO;
    evtEstOper6.idCondicaoOperativa = CondicaoOperativa.TST;
    evtEstOper6.potenciaDisponivel = 527;
    evtEstOper6.dataVerificada = new Date(2014, 8, 17, 11, 42);

    var evtEstOper7 = new EventoMudancaEstadoOperativo();
    evtEstOper7.idEstadoOperativo = EstadoOperativo.LIG;
    evtEstOper7.idCondicaoOperativa = CondicaoOperativa.RFO;
    evtEstOper7.idClassificacaoOrigem = ClassificacaoOrigem.GUM;
    evtEstOper7.potenciaDisponivel = 420;
    evtEstOper7.dataVerificada = new Date(2014, 8, 17, 17, 46);

    var evtEstOper8 = new EventoMudancaEstadoOperativo();
    evtEstOper8.idEstadoOperativo = EstadoOperativo.LIG;
    evtEstOper8.idCondicaoOperativa = CondicaoOperativa.NOT;
    evtEstOper8.potenciaDisponivel = 527;
    evtEstOper8.dataVerificada = new Date(2014, 8, 17, 23, 0);

    var evtEstOper9 = new EventoMudancaEstadoOperativo();
    evtEstOper9.idEstadoOperativo = EstadoOperativo.LIG;
    evtEstOper9.idCondicaoOperativa = CondicaoOperativa.NOR;
    evtEstOper9.potenciaDisponivel = 527;
    evtEstOper9.dataVerificada = new Date(2014, 8, 18, 3, 0);

    var evtEstOper10 = new EventoMudancaEstadoOperativo();
    evtEstOper10.idEstadoOperativo = EstadoOperativo.DCO;
    evtEstOper10.idCondicaoOperativa = CondicaoOperativa.NOR;
    evtEstOper10.potenciaDisponivel = 527;
    evtEstOper10.dataVerificada = new Date(2014, 8, 19, 11, 22);
    
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper1);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper2);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper3);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper4);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper5);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper6);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper7);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper8);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper9);
    EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper10);

    var retorno = [evtEstOper1, evtEstOper2, evtEstOper3, evtEstOper4, evtEstOper5, 
        evtEstOper6, evtEstOper7, evtEstOper8, evtEstOper9, evtEstOper10];

    retorno.forEach(element => {
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(element);
    });

    return retorno;
}

module.exports.static_mass_0UG3_07_2014 = function (uge) {
    
        uge.potenciaDisponivel = 527;
    
        var evtEstOper1 = new EventoMudancaEstadoOperativo();
        evtEstOper1.idEstadoOperativo = EstadoOperativo.DCO;
        evtEstOper1.idCondicaoOperativa = CondicaoOperativa.NOR;
        evtEstOper1.potenciaDisponivel = 527;
        evtEstOper1.dataVerificada = new Date(2014, 6, 1, 0, 0);
    
        var evtEstOper2 = new EventoMudancaEstadoOperativo();
        evtEstOper2.idEstadoOperativo = EstadoOperativo.LIG;
        evtEstOper2.idCondicaoOperativa = CondicaoOperativa.NOR;
        evtEstOper2.potenciaDisponivel = 527;
        evtEstOper2.dataVerificada = new Date(2014, 6, 3, 17, 46);
    
        var evtEstOper3 = new EventoMudancaEstadoOperativo();
        evtEstOper3.idEstadoOperativo = EstadoOperativo.DCO;
        evtEstOper3.idCondicaoOperativa = CondicaoOperativa.NOR;
        evtEstOper3.potenciaDisponivel = 527;
        evtEstOper3.dataVerificada = new Date(2014, 6, 20, 0, 17);
    
        var evtEstOper4 = new EventoMudancaEstadoOperativo();
        evtEstOper4.idEstadoOperativo = EstadoOperativo.DPR;
        evtEstOper4.idClassificacaoOrigem = ClassificacaoOrigem.GUM;
        evtEstOper4.potenciaDisponivel = 0;
        evtEstOper4.dataVerificada = new Date(2014, 6, 21, 7, 46);
            
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper1);
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper2);
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper3);
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(evtEstOper4);
    
        var retorno = [evtEstOper1, evtEstOper2, evtEstOper3, evtEstOper4];
    
        retorno.forEach(element => {
            EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(element);
        });
    
        return retorno;
    }
    