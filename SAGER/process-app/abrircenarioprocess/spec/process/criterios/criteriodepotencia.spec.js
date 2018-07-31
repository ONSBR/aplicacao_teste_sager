const Criterios = require('../../../process/criterios/criterios');
const Enumerable = require('linq');

describe('Critério: ', function () {

    let criterios;

    beforeEach(function () {
        criterios = new Criterios();
    });

    it('Aplicar critério de potência.', () => {
        let regraPotenciaDisponivel = { 
            tipoRegra: 'Potência Disponível', 
            regraDe: 'ALUXG-0UG1', 
            regraPara: '500',
            dataInicioVigencia: new Date(2018, 3, 1),
            dataFimVigencia: new Date(2018, 3, 30)
        };
        let update = jasmine.createSpy('update');
        let dataset = {
            eventomudancaestadooperativo: {
                collection: Enumerable.from([
                    { idEvento: '10', idUge: 'ALUXG-0UG1', potenciaDisponivel: '100', dataVerificada: new Date(2018, 2, 1)},
                    { idEvento: '11', idUge: 'ALUXG-0UG1', potenciaDisponivel: '100', idCondicaoOperativa: 'NOR', dataVerificada: new Date(2018, 3, 1)},
                    { idEvento: '12', idUge: 'ALUXG-0UG1', potenciaDisponivel: '100', dataVerificada: new Date(2018, 4, 1)},
                    { idEvento: '13', idUge: 'ALUXG-0UG2', potenciaDisponivel: '100', dataVerificada: new Date(2018, 3, 30)}
                ]),
                update: update
            }
        };

        criterios.aplicar(regraPotenciaDisponivel, dataset);

        expect(update.calls.count()).toEqual(2);
        expect(update).toHaveBeenCalledWith({
            idEvento: '11', 
            idUge: 'ALUXG-0UG1', 
            potenciaDisponivel: '500', 
            idCondicaoOperativa: 'NOR',
            idClassificacaoOrigem: '',
            dataVerificada: new Date(2018, 3, 1)
        });
    });

});