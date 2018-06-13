const Cenario = require('../../process/abrircenario/cenario');

describe('Cenário: ', function () {
    
    let cenario;
    const NOME_CENARIO = 'cenário de teste';
    const JUSTIFICATIVA_CENARIO = 'justificativa da abertura do cenário';

    beforeEach(function () {
        cenario = new Cenario();
    });

    it('Abrir Cenário.', () => {
        let payload = {
            cenario: {
                nome : NOME_CENARIO,
                justificativa : JUSTIFICATIVA_CENARIO
            }
        };
        let fork = jasmine.createSpy('fork');

        cenario.abrir(payload, fork);

        expect(fork.calls.count()).toEqual(1);
        expect(fork).toHaveBeenCalledWith(NOME_CENARIO, JUSTIFICATIVA_CENARIO);
    });

    it('Aplicar critérios de potência.', () => {
        cenario.regras = jasmine.createSpyObj('regras', ['aplicar']);

        let regraPotenciaDisponivel = {tipoRegra: 'Potência Disponível', regraDe:'ALUXG-0UG1', regraPara:'500'};
        let regraFranquia = {tipoRegra: 'Franquia', regraDe:'ALUXG-0UG1', regraPara:'500'};
        let payload = {
            cenario: {
                regras: [regraPotenciaDisponivel, regraFranquia]
            }
        };
        let dataset = {};

        cenario.aplicarCriterios(payload, dataset);

        expect(cenario.regras.aplicar).toHaveBeenCalledWith(regraPotenciaDisponivel);
        expect(cenario.regras.aplicar).toHaveBeenCalledWith(regraFranquia);
    });


});