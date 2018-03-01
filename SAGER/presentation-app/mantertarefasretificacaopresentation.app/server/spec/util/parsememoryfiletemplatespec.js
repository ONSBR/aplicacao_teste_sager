const ParseMemoryFileTemplate = require('../../helpers/parseeventosxlsx');

describe('ParseMemoryFileTemplate deve:', function () {


    it('RS_RINT019: Se o campo Condição Operativa assumir o valor “NOR”, “NOT” ou “TST” o campo Disponibilidade deve ser preenchido'
        + 'automaticamente com o valor da Potência para Cálculo de Indisponibilidade vigente na data do evento para a unidade ' +
        ' geradora ou limite da Interligação Internacional, e não deve habilitar para preenchimento do ator.', () => {
        let uge1 = { idUge: '1', potenciaDisponivel: 200 };
        let uge2 = { idUge: '2', potenciaDisponivel: 500 };

        let uges = [uge1, uge2];
        let parseMemoryFileTemplate = ParseMemoryFileTemplate.factory(uges);

        let eventoNOR = { idUge: '2', idCondicaoOperativa: 'NOR' };
        expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoNOR)).toBe(200);
        let eventoNOT = { idUge: '2', idCondicaoOperativa: 'NOT' };
        expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoNOT)).toBe(200);
        let eventoTST = { idUge: '2', idCondicaoOperativa: 'TST' };
        expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoTST)).toBe(200);

        let eventoDEM = { idUge: '2', idCondicaoOperativa: 'DEM' };
        expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoDEM)).toBe(0);
        let eventoDUR = { idUge: '2', idCondicaoOperativa: 'DUR' };
        expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoDUR)).toBe(0);
        let eventoDAU = { idUge: '2', idCondicaoOperativa: 'DAU' };
        expect(parseMemoryFileTemplate.getDisponibilidade(uge1, eventoDAU)).toBe(0);
    });

    it('Adicionar uma linha na planilha para cada evento:', () => {
        let uge1 = { idUge: '1', idUsina: 'ALUXG2', potenciaDisponivel: 200 };
        let uge2 = { idUge: '2', idUsina: 'ALUXG', potenciaDisponivel: 500 };

        let uges = [uge1, uge2];
        let dataInicial = new Date(2017, 02, 01);
        let dataFinal = new Date(2017, 03, 01);
        let eventos = [
            {idEvento: '1', idUge: '2', idEvento: '33', idEstadoOperativo: 'LIG', idCondicaoOperativa: 'NOR',
                idClassificacaoOrigem: 'GAG', dataVerificada:'2017-03-03', potenciaDisponivel: 400}, 
            {idEvento: '1', idUge: '2', idEvento: '33', idEstadoOperativo: 'LIG', idCondicaoOperativa: 'NOR',
                idClassificacaoOrigem: 'GAG', dataVerificada:'2017-03-03', potenciaDisponivel: 400}
        ];
        let parseMemoryFileTemplate = ParseMemoryFileTemplate.factory(uges, dataInicial, dataFinal, eventos);

        let wsData = [];
        parseMemoryFileTemplate.adicionaListaDeEventos(wsData);

        expect(wsData[0]).toEqual([ 'ALUXG', '2', '33', 'LIG', 'NOR', 'GAG', '03-03-2017 00:00:00', 500]);
    });

    it('Gerar uma planilha:', () => {
        let uge1 = { idUge: '1', idUsina: 'ALUXG2', potenciaDisponivel: 200 };
        let uge2 = { idUge: '2', idUsina: 'ALUXG', potenciaDisponivel: 500 };

        let uges = [uge1, uge2];
        let dataInicial = new Date(2017, 02, 01);
        let dataFinal = new Date(2017, 03, 01);
        let eventos = [
            {idEvento: '1', idUge: '2', idEvento: '33', idEstadoOperativo: 'LIG', idCondicaoOperativa: 'NOR',
                idClassificacaoOrigem: 'GAG', dataVerificada:'2017-03-03', potenciaDisponivel: 400}, 
            {idEvento: '1', idUge: '2', idEvento: '33', idEstadoOperativo: 'LIG', idCondicaoOperativa: 'NOR',
                idClassificacaoOrigem: 'GAG', dataVerificada:'2017-03-03', potenciaDisponivel: 400}
        ];
        let parseMemoryFileTemplate = ParseMemoryFileTemplate.factory(uges, dataInicial, dataFinal, eventos);

        let wsData = [];
        let contentXlsx = parseMemoryFileTemplate.parse();

        expect(contentXlsx).toBeDefined();
    });


});



