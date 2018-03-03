const Util = require('../../helpers/util');

describe('util deve:', function () {

    it('Retornar o texto vazio caso não exista conteudo para determinado campo:', () => {
        let textoVazio = Util.textToExcel(undefined);
        expect(textoVazio).toBe('');
    });

    it('Retornar o texto vazio caso não exista conteudo para determinado campo:', () => {
        let textoVazio = Util.formatDate(undefined, "DD/MM/YYYY");
        expect(textoVazio).toBe('');
    });
});



