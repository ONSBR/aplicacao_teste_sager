const EventoMudancaEstadoOperativoBusiness = require('../../business/eventomudancaestadooperativobusiness');

describe('EventoMudancaEstadoOperativoBusiness deve:', function () {
    let eventoMudancaEstadoOperativoBusiness = new EventoMudancaEstadoOperativoBusiness();

    it('Validar a existência de um evento de Entrada Em Operação comercial(EOC):', () => {
        let eventosComUmEOC = [{ idEstadoOperativo: 'EOC' }, { idEstadoOperativo: 'LIG' }, { idEstadoOperativo: 'LIG' },
        { idEstadoOperativo: 'LCC' }];
        expect(eventoMudancaEstadoOperativoBusiness.verificarUnicidadeEventoEntradaOperacaoComercial(eventosComUmEOC)).toBeTruthy();

        let eventosComUmEOC2 = [{ idEstadoOperativo: 'LIG' }, { idEstadoOperativo: 'EOC' }, { idEstadoOperativo: 'LIG' },
        { idEstadoOperativo: 'LCC' }];
        expect(eventoMudancaEstadoOperativoBusiness.verificarUnicidadeEventoEntradaOperacaoComercial(eventosComUmEOC2)).toBeTruthy();

        let eventosComDoisEOC = [{ idEstadoOperativo: 'EOC' }, { idEstadoOperativo: 'LIG' }, { idEstadoOperativo: 'LIG' },
        { idEstadoOperativo: 'EOC' }];

        expect(eventoMudancaEstadoOperativoBusiness.verificarUnicidadeEventoEntradaOperacaoComercial(eventosComDoisEOC)).toBeFalsy();
    });

    it('Preencher o campo disponibilidade com a potência vigente quando a condição operativa for NOR, NOT ou TST:', () => {
        let uge = { potenciaDisponivel: 250 };

        let eventoNOR = { idCondicaoOperativa: 'NOR', potenciaDisponivel: undefined, idEstadoOperativo: 'LIG' };
        eventoMudancaEstadoOperativoBusiness.preencherCampoDisponibilidadeVazio(eventoNOR, uge);
        expect(eventoNOR.potenciaDisponivel).toEqual(uge.potenciaDisponivel);

        let eventoNOT = { idCondicaoOperativa: 'NOT', potenciaDisponivel: undefined, idEstadoOperativo: 'LIG' };
        eventoMudancaEstadoOperativoBusiness.preencherCampoDisponibilidadeVazio(eventoNOT, uge);
        expect(eventoNOT.potenciaDisponivel).toEqual(uge.potenciaDisponivel);

        let eventoTST = { idCondicaoOperativa: 'TST', potenciaDisponivel: undefined, idEstadoOperativo: 'LIG' };
        eventoMudancaEstadoOperativoBusiness.preencherCampoDisponibilidadeVazio(eventoTST, uge);
        expect(eventoTST.potenciaDisponivel).toEqual(uge.potenciaDisponivel);

        let eventoComDisponibilidadePreenchida = { idCondicaoOperativa: 'TST', potenciaDisponivel: 500, idEstadoOperativo: 'LIG' };
        eventoMudancaEstadoOperativoBusiness.preencherCampoDisponibilidadeVazio(eventoComDisponibilidadePreenchida, uge);
        expect(eventoComDisponibilidadePreenchida.potenciaDisponivel).toEqual(500);
    });

    it('Preencher o campo disponibilidade com zero quando o estado operativo for desligado exceto DCO:', () => {
        let uge = { potenciaDisponivel: 250 };

        let eventoDEM = { idEstadoOperativo: 'DEM', potenciaDisponivel: undefined };
        eventoMudancaEstadoOperativoBusiness.preencherCampoDisponibilidadeVazio(eventoDEM, uge);
        expect(eventoDEM.potenciaDisponivel).toEqual(0);

        let eventoDCA = { idEstadoOperativo: 'DCA', potenciaDisponivel: undefined };
        eventoMudancaEstadoOperativoBusiness.preencherCampoDisponibilidadeVazio(eventoDCA, uge);
        expect(eventoDCA.potenciaDisponivel).toEqual(0);

        let eventoTST = { idEstadoOperativo: 'DES', potenciaDisponivel: undefined };
        eventoMudancaEstadoOperativoBusiness.preencherCampoDisponibilidadeVazio(eventoTST, uge);
        expect(eventoTST.potenciaDisponivel).toEqual(0);

        let eventoDCO = { idEstadoOperativo: 'DCO', potenciaDisponivel: undefined };
        eventoMudancaEstadoOperativoBusiness.preencherCampoDisponibilidadeVazio(eventoDCO, uge);
        expect(eventoDCO.potenciaDisponivel).toBe(uge.potenciaDisponivel);
    });

    it('Verificar Evento DCO Apos Lig:', () => {
        let listaComUmEvento = [{id: '1'}];
        expect(eventoMudancaEstadoOperativoBusiness.verificarEventoDCOAposLig(listaComUmEvento)).toBeTruthy();

        let eventosRFO = [{ idEstadoOperativo: 'LIG', idCondicaoOperativa: 'RFO', idClassificacaoOrigem: 'GOT', potenciaDisponivel: 300 },
        { idEstadoOperativo: 'DCO', idCondicaoOperativa: 'RFO', idClassificacaoOrigem: 'GOT', potenciaDisponivel: 300},
        { idEstadoOperativo: 'LIG', potenciaDisponivel: 300, idCondicaoOperativa: 'RFO' }];

        expect(eventoMudancaEstadoOperativoBusiness.verificarEventoDCOAposLig(eventosRFO)).toBeTruthy();

        let eventosRPR = [{ idEstadoOperativo: 'LIG', idCondicaoOperativa: 'RPR', idClassificacaoOrigem: 'GOT', potenciaDisponivel: 300 },
        { idEstadoOperativo: 'DCO', idCondicaoOperativa: 'RPR', idClassificacaoOrigem: 'GOT', potenciaDisponivel: 300},
        { idEstadoOperativo: 'LIG', potenciaDisponivel: 300, idCondicaoOperativa: 'RPR' }];

        expect(eventoMudancaEstadoOperativoBusiness.verificarEventoDCOAposLig(eventosRPR)).toBeTruthy();


        let eventosLIG = [{ idEstadoOperativo: 'LIG', idCondicaoOperativa: 'RPR', idClassificacaoOrigem: 'GOT', potenciaDisponivel: 300 },
        { idEstadoOperativo: 'LIG', idCondicaoOperativa: 'RPR', idClassificacaoOrigem: 'GOT', potenciaDisponivel: 300},
        { idEstadoOperativo: 'LIG', potenciaDisponivel: 300, idCondicaoOperativa: 'RPR' }];

        expect(eventoMudancaEstadoOperativoBusiness.verificarEventoDCOAposLig(eventosLIG)).toBeTruthy();
    });


});



