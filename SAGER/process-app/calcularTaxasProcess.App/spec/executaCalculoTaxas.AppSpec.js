const fileDataMass = require("./testMass/fileDataMass");
const utils = require("../utils");
const utilTest = require("./utilTest");
const calcularTaxasProcess = require("../process/calcularTaxasProcess.App");

describe('O SAGER deve calcular as taxas TEIFA e TEIP', function () {

    it('validar execução do processapp de cálculo de taxas para o mês 09/2014.', () => {

        Promise.all([fileDataMass.file_mass_uge_ALUXG(), fileDataMass.file_mass_events_09_2014_ALUXG()]).then(results => {

            var uges = results[0];
            var evtsEstOpr = results[1];

            var idUsina = "ALUXG";

            var fechamento = { id: utils.guid(), mes: 9, ano: 2014 };

            var context = { dataSet: {}, evento: {} };
            context.evento.payload = { idFechamento: fechamento.id };

            context.dataSet.FechamentoMensal = new utilTest.StubDataset();
            context.dataSet.FechamentoMensal.insert(fechamento);

            context.dataSet.ExecucaoCalculoFechamento = new utilTest.StubDataset();

            context.dataSet.Usina = new utilTest.StubDataset();
            context.dataSet.Usina.insert({ idUsina: idUsina });

            calcularTaxasProcess.executarCalculoTaxas(context);

            expect(context.eventoSaida[0].payload.idUsina).toBe(idUsina);

            var execucao = context.dataSet.ExecucaoCalculoFechamento.collection.firstOrDefault();
            expect(execucao).toBeDefined();

            context.dataSet.UnidadeGeradora = new utilTest.StubDataset(uges);
            context.dataSet.EventoMudancaEstadoOperativo = new utilTest.StubDataset(evtsEstOpr);

            context.dataSet.ParametroTaxa = new utilTest.StubDataset();
            context.dataSet.Taxa = new utilTest.StubDataset();

            context.evento = { payload: { idUsina: idUsina, fechamento: fechamento } };

            calcularTaxasProcess.calcularTaxasMensaisPorUsina(context);

            expect(context.dataSet.Taxa.collection.firstOrDefault().valorTaxa).toBe(0.004135802469135802);

            expect(context.dataSet.ParametroTaxa.collection.toArray().length).toBe(48);

        }).catch(error => {
            console.error("error: " + error.stack);
            expect(error).toBe(null);
        });

    })

});

