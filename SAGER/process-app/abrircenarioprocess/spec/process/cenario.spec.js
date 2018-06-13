const Cenario = require('../../process/abrircenario/cenario');

describe('Cenário: ', function () {
    
    const NOME_CENARIO = 'cenário de teste';
    const JUSTIFICATIVA_CENARIO = 'justificativa da abertura do cenário';
    
    it('Abrir Cenário.', () => {
        let payload = {
            cenario: {
                nome : NOME_CENARIO,
                justificativa : JUSTIFICATIVA_CENARIO
            }
        };
        let fork = jasmine.createSpy('fork');
        let cenario = new Cenario();
        cenario.abrir(payload, fork);
        expect(fork.calls.count()).toEqual(1);
        expect(fork).toHaveBeenCalledWith(NOME_CENARIO, JUSTIFICATIVA_CENARIO);
    });


});