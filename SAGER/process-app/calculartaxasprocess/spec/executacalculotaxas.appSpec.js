const fileDataMass = require("./testmass/filedatamass");
const utils = require("../utils");
const utilTest = require("./utiltest");
const executor = require("../process/business/executorcalculotaxas");
const FechamentoMensal = require("../process/entities/fechamentomensal");
const PeriodoCalculo = require("../process/business/periodocalculo")


describe('O SAGER deve calcular as taxas TEIFA e TEIP', function () {

    it('validar execução do processapp de cálculo de taxas para o mês 09/2014.', () => {

        Promise.all([fileDataMass.file_mass_uge_ALUXG(), fileDataMass.file_mass_events_09_2014_ALUXG()]).then(results => {

            var uges = results[0];
            var evtsEstOpr = results[1];

            var instance_id = utils.guid();

            var idUsina = "ALUXG";

            var mes = 9;
            var ano = 2014;

            var entities = [];

            var context = { dataset: {}, event: {} };

            context.dataset.fechamentomensal = new utilTest.Stubdataset(entities, []);
            var fechamento = new FechamentoMensal("1", mes, ano, new Date());
            context.dataset.fechamentomensal.add(fechamento);
            var execucaoCalculo = {id: ""};
            context.dataset.execucaocalculofechamento = new utilTest.Stubdataset(entities, [execucaoCalculo]);

            context.dataset.usina = new utilTest.Stubdataset();
            context.dataset.usina.add({ idUsina: idUsina });

            var periodoCalculo = new PeriodoCalculo(mes, ano);

            context.event.payload = {
                idUsina: idUsina, idFechamento: 
                fechamento.id, idExecucaoCalculo: execucaoCalculo.id, 
                dataInicialEvento: periodoCalculo.dataInicio, dataFinalEvento: periodoCalculo.dataFim
            };

            context.dataset.unidadegeradora = new utilTest.Stubdataset(entities, uges);
            context.dataset.eventomudancaestadooperativo = new utilTest.Stubdataset(entities, evtsEstOpr);

            context.dataset.parametrotaxa = new utilTest.Stubdataset(entities);
            context.dataset.taxa = new utilTest.Stubdataset(entities);

            context.dataset.fechamentomensal = new utilTest.Stubdataset(entities, [fechamento]);

            try {
                executor.calcularTaxasPorUsina(context);
            } catch (error) {
                console.log("error: " + error.stack);
            }

            expect(context.dataset.taxa.collection.toArray().length).toBe(2);

            expect(context.dataset.taxa.collection.toArray()[0].valorTaxa).toBe(0.004135802469135802);

            expect(context.dataset.parametrotaxa.collection.toArray().length).toBe(48);

            entities.forEach(it => {
                it._metadata.instance_id = instance_id;
            });

        }).catch(error => {
            console.log("error: " + error.stack);
            expect(error).toBe(null);
        });

    })

});



