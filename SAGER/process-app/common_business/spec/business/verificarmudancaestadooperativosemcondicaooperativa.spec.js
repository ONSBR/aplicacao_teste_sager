const EventoMudancaEstadoOperativoBusiness = require('../../business/eventomudancaestadooperativobusiness');

describe('EventoMudancaEstadoOperativoBusiness deve:', function () {
    const MSG_ERRO = 'Não pode haver evento de Mudança de Estado Operativo sem a Condição Operativa preenchida quando'
        + ' o Estados Operativos for igual a “LIG”, “LCS”, “LCC”, “LCI”, “DCO” ou “RDP”.'
    let eventoMudancaEstadoOperativoBusiness = new EventoMudancaEstadoOperativoBusiness();

    it('Restringir evento de mudança de estado operativo sem condição operativa.', () => {

        let eventosLIGSemCondicaoOperativa = [{ idEstadoOperativo: 'LIG', idCondicaoOperativa: '' }];
        expect(
            function () {
                eventoMudancaEstadoOperativoBusiness.verificarCondicaoOperativa(eventosLIGSemCondicaoOperativa);
            }
        ).toThrowError(MSG_ERRO);

        eventosLIGSemCondicaoOperativa = [{ idEstadoOperativo: 'LIG'}];
        expect(
            function () {
                eventoMudancaEstadoOperativoBusiness.verificarCondicaoOperativa(eventosLIGSemCondicaoOperativa);
            }
        ).toThrowError(MSG_ERRO);

        eventosLCSSemCondicaoOperativa = [{ idEstadoOperativo: 'LCS'}];
        expect(
            function () {
                eventoMudancaEstadoOperativoBusiness.verificarCondicaoOperativa(eventosLCSSemCondicaoOperativa);
            }
        ).toThrowError(MSG_ERRO);

        eventosDEMSemCondicaoOperativa = [{ idEstadoOperativo: 'DEM'}];
        eventoMudancaEstadoOperativoBusiness.verificarCondicaoOperativa(eventosDEMSemCondicaoOperativa);
    });

    it('Permitir evento de mudança de estado operativo com condição operativa.', () => {
        let eventosLig = [{ idEstadoOperativo: 'LIG', idCondicaoOperativa: 'NOR' }];
        eventoMudancaEstadoOperativoBusiness.verificarCondicaoOperativa(eventosLig);
    });
});