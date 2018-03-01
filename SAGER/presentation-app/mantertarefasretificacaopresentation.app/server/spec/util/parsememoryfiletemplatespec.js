const ParseMemoryFileTemplate = require('../../helpers/parseeventosxlsx');

describe('ParseMemoryFileTemplate deve:', function () {


    it('RS_RINT019: Se o campo Condição Operativa assumir o valor “NOR”, “NOT” ou “TST” o campo Disponibilidade deve ser preenchido'
        + 'automaticamente com o valor da Potência para Cálculo de Indisponibilidade vigente na data do evento para a unidade ' +
        ' geradora ou limite da Interligação Internacional, e não deve habilitar para preenchimento do ator.', () => {
            
            let uge1 = { idUge: '1', potenciaDisponivel: 200 };
            let uge2 = { idUge: '2', potenciaDisponivel: 500 };

            let uges = [uge1, uge2];
            let parseMemoryFileTemplate = ParseMemoryFileTemplate.factory(uges);
            
            let eventoNOR = {idUge:'2', idCondicaoOperativa:'NOR'};
            expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoNOR)).toBe(200);
            let eventoNOT = {idUge:'2', idCondicaoOperativa:'NOT'};
            expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoNOT)).toBe(200);
            let eventoTST = {idUge:'2', idCondicaoOperativa:'TST'};
            expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoTST)).toBe(200);

            let eventoDEM = {idUge:'2', idCondicaoOperativa:'DEM'};
            expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoDEM)).toBe(0);
            let eventoDUR = {idUge:'2', idCondicaoOperativa:'DUR'};
            expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoDUR)).toBe(0);
            let eventoDAU = {idUge:'2', idCondicaoOperativa:'DAU'};
            expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoDAU)).toBe(0);
        });

});



