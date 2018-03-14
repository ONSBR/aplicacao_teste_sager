const EventoMudancaEstadoOperativoBusiness = require('../../business/eventomudancaestadooperativobusiness');

describe('EventoMudancaEstadoOperativoBusiness deve:', function () {
    let eventoMudancaEstadoOperativoBusiness;

    beforeEach(function () {
        eventoMudancaEstadoOperativoBusiness = new EventoMudancaEstadoOperativoBusiness();
    });

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

});



