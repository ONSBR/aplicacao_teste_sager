const EventoMudancaEstadoOperativoBusiness = require('../../business/eventomudancaestadooperativobusiness');

describe('EventoMudancaEstadoOperativoBusiness deve:', function () {
    const MSG_ERRO = 'Não pode haver evento de Mudança de Estado Operativo sem a Condição Operativa preenchida quando'
        + ' o Estados Operativos for igual a “LIG”, “LCS”, “LCC”, “LCI”, “DCO” ou “RDP”.'
    let eventoMudancaEstadoOperativoBusiness = new EventoMudancaEstadoOperativoBusiness();

    it('Restringir evento de mudança de estado operativo sem condição operativa.', () => {

        let eventosLigSemCondicaoOperativa = [{ idEstadoOperativo: 'LIG', idCondicaoOperativa: '' }];
        expect(
            function () {
                eventoMudancaEstadoOperativoBusiness.verificarCondicaoOperativa(eventosLigSemCondicaoOperativa);
            }
        ).toThrowError(MSG_ERRO);

        eventosLigSemCondicaoOperativa = [{ idEstadoOperativo: 'LIG'}];
        expect(
            function () {
                eventoMudancaEstadoOperativoBusiness.verificarCondicaoOperativa(eventosLigSemCondicaoOperativa);
            }
        ).toThrowError(MSG_ERRO);

        let eventosLig = [{ idEstadoOperativo: 'LIG', idCondicaoOperativa: 'NOR' }];
        eventoMudancaEstadoOperativoBusiness.verificarCondicaoOperativa(eventosLig);
    });
});