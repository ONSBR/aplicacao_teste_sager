class ManterTarefasMediatorSpecHelper {

    static criarPlanilha() {
        let eventosPlanilha = [];
        eventosPlanilha['!ref'] = 'A1:I4';

        eventosPlanilha['A3'] = {v:'ALUXG'};
        eventosPlanilha['B3'] = {v:'ALUXG-0UG1'};
        eventosPlanilha['C3'] = {v:'400872'};
        eventosPlanilha['D3'] = {v:'DCA'};
        eventosPlanilha['E3'] = {v:''};
        eventosPlanilha['F3'] = {v:'GAG'};
        eventosPlanilha['G3'] = {v:''};
        eventosPlanilha['H3'] = {v:''};
        eventosPlanilha['I3'] = {v:'i'};

        eventosPlanilha['A4'] = {v:'ALUXG'};
        eventosPlanilha['B4'] = {v:'ALUXG-0UG1'};
        eventosPlanilha['C4'] = {v:'400872'};
        eventosPlanilha['D4'] = {v:'DCA'};
        eventosPlanilha['E4'] = {v:''};
        eventosPlanilha['F4'] = {v:'GAG'};
        eventosPlanilha['G4'] = {v:''};
        eventosPlanilha['H4'] = {v:''};
        eventosPlanilha['I4'] = {v:'i'};

        let planilha = {
            Sheets: {
                eventos: eventosPlanilha
            }
        };

        return planilha;
    }

}

module.exports = ManterTarefasMediatorSpecHelper