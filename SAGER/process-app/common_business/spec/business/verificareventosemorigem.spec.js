const EventoMudancaEstadoOperativoBusiness = require('../../business/eventomudancaestadooperativobusiness');

describe('EventoMudancaEstadoOperativoBusiness deve:', function () {
    const MSG_ERRO = 'Não pode haver evento de Mudança de Estado Operativo sem a Origem preenchida quando o estado ' +
        'operativo for igual a “DEM”, “DUR”, “DAU”, “DPR”, “DPA” ou “DCA”.';
    let eventoMudancaEstadoOperativoBusiness = new EventoMudancaEstadoOperativoBusiness();

    it('Restringir evento de mudança de estado operativo sem origem.', () => {

        let eventosDEMSemOrigem = [{ idEstadoOperativo: 'DEM', idClassificacaoOrigem: '' }];
        expect(
            function () {
                eventoMudancaEstadoOperativoBusiness.verificarClassificacaoOrigem(eventosDEMSemOrigem);
            }
        ).toThrowError(MSG_ERRO);

        eventosDEMSemOrigem = [{ idEstadoOperativo: 'DEM' }];
        expect(
            function () {
                eventoMudancaEstadoOperativoBusiness.verificarClassificacaoOrigem(eventosDEMSemOrigem);
            }
        ).toThrowError(MSG_ERRO);
    });

    it('Permitir evento de mudança de estado operativo com origem preenchida origem.', () => {
        let eventosDEMComOrigemPreenchida = [{ idEstadoOperativo: 'DEM', idClassificacaoOrigem: 'GUM' }];
        eventoMudancaEstadoOperativoBusiness.verificarClassificacaoOrigem(eventosDEMComOrigemPreenchida);
    });

});