const fileDataMass = require("./testMass/filedatamass");
const utils = require("../utils");
const utilTest = require("./utiltest");
const ExecutorCalculoTaxas = require("../process/business/executorcalculotaxas");
const FechamentoMensal = require("../process/entities/fechamentomensal");
const HttpClient = require("plataforma-sdk/http/client");

const DOMAIN_PORT = 2188;

const MAPA = "calculartaxasprocess";

var httpClient = new HttpClient();

function catch_error(error) {
    console.error("error: " + error.stack);
}

function inserirDados(lista) {
    console.log("Inserindo dados. lista.length: " + lista.length);
    console.log("Dados: " + JSON.stringify(lista));
    return httpClient.post(getUrlAppDomain(null, null, "persist"), JSON.stringify([lista]))/*.then(result => {
        console.log("Dados incluídos...");
    })*/.catch(catch_error);
}

function getUrlAppDomain(map, entity, verb) {
    if (!map) {
        map = MAPA;
    }
    var url = `http://localhost:${DOMAIN_PORT}/${map}/`;
    if (entity) {
        url += `${entity}/`;
    }
    if (verb) {
        url += verb;
    }
    return url;
}

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
            context.event.payload = { mesFechamento: mes, anoFechamento: ano };

            console.log("INICIO FECHAMENTO");

            context.dataset.fechamentomensal = new utilTest.Stubdataset(entities, []);
            var fechamento = new FechamentoMensal("1", mes, ano, new Date());
            context.dataset.fechamentomensal.add(fechamento);
            context.dataset.execucaocalculofechamento = new utilTest.Stubdataset(entities);

            context.dataset.usina = new utilTest.Stubdataset();
            context.dataset.usina.add({ idUsina: idUsina });

            expect(context.event.payload.anoFechamento).toBe(ano);
            try {
                ExecutorCalculoTaxas.executarCalculoTaxas(context);
            } catch (error) {
                console.log("error: " + error.stack);
            }

            expect(context.eventOut[0].payload.idUsina).toBe(idUsina);
            expect(context.eventOut[0].payload.fechamento.ano).toBe(ano);

            var execucao = context.dataset.execucaocalculofechamento.collection.firstOrDefault();
            expect(execucao).toBeDefined();

            var eventorigem = context.eventOut[0];
            
            context = { dataset: {}, event: eventorigem };

            context.dataset.unidadegeradora = new utilTest.Stubdataset(entities, uges);
            console.log("DDD"+ evtsEstOpr.length);
            context.dataset.eventomudancaestadooperativo = new utilTest.Stubdataset(entities, evtsEstOpr);

            context.dataset.parametrotaxa = new utilTest.Stubdataset(entities);
            context.dataset.taxa = new utilTest.Stubdataset(entities);

            try {
                ExecutorCalculoTaxas.calcularTaxasMensaisPorUsina(context);
            } catch (error) {
                console.log("error: " + error.stack);
            }

            expect(context.dataset.taxa.collection.toArray().length).toBe(2);

            expect(context.dataset.taxa.collection.toArray()[0].valorTaxa).toBe(0.004135802469135802);

            expect(context.dataset.parametrotaxa.collection.toArray().length).toBe(48);

            console.log("\n context final["+instance_id+"]: " + JSON.stringify(context) + "\n");

            entities.forEach(it => {
                it._metadata.instance_id = instance_id;
            });
            inserirDados(entities).then(result => {
                console.log("Execução realizada com sucesso. taxas calculadas para mes: " + mes + ", ano: " + ano);
            });

        }).catch(error => {
            console.log("error: " + error.stack);
            expect(error).toBe(null);
        });

    })

});



