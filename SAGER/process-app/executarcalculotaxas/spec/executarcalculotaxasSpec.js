const FechamentoMensal = require("../process/entities/fechamentomensal");
const utils = require("../utils");
const executor = require("../process/business/executorcalculotaxas");
const Enumerable = require("linq");
const PeriodoCalculo = require("../process/business/periodocalculo");

describe('Solicitar cálculo de taxas, TEIFA e TEIP, mensal e acumulada, do fechamento das usinas', function () {

    it('validar execução do processapp de requisição de cálculo de taxas para o mês 09/2014.', () => {

        var instance_id = utils.guid();

        var idUsina = "ALUXG";

        var mes = 9;
        var ano = 2014;

        var entities = [];
        var context = { dataset: {}, event: {} };
        context.event.payload = { mesFechamento: mes, anoFechamento: ano };

        var eventOut = [];
        var eventmanager = {};
        eventmanager.emit = function (evt) { return new Promise((res, rej) => { eventOut.push(evt); res(); }) };

        console.log("INICIO FECHAMENTO 09/2014");

        context.dataset.fechamentomensal = new Stubdataset(entities, []);
        var fechamento = new FechamentoMensal("1", mes, ano, new Date());
        context.dataset.fechamentomensal.add(fechamento);
        context.dataset.execucaocalculofechamento = new Stubdataset(entities);

        context.dataset.usina = new Stubdataset();
        context.dataset.usina.add({ idUsina: idUsina });

        expect(context.event.payload.anoFechamento).toBe(ano);
        try {
            executor.executarCalculoTaxas(context, eventmanager);
        } catch (error) {
            console.log("error: " + error.stack);
        }

        var periodoCalculo = new PeriodoCalculo(mes, ano);
        var periodoAcumulado = new PeriodoCalculo(mes, ano, 60);

        expect(eventOut[0].payload.acumulada).toBeUndefined();
        expect(eventOut[0].payload.idUsina).toBe(idUsina);
        expect(eventOut[0].payload.idFechamento).toBe(fechamento.id);
        expect(eventOut[0].payload.dataInicialEvento.getTime()).toBe(periodoCalculo.dataInicio.getTime());
        expect(eventOut[0].payload.dataFinalEvento.getTime()).toBe(periodoCalculo.dataFim.getTime());

        expect(eventOut[1].payload.acumulada).toBe(true);
        expect(eventOut[1].payload.idUsina).toBe(idUsina);
        expect(eventOut[1].payload.idFechamento).toBe(fechamento.id);
        expect(eventOut[1].payload.dataInicialEvento.getTime()).toBe(periodoAcumulado.dataInicio.getTime());
        expect(eventOut[1].payload.dataFinalEvento.getTime()).toBe(periodoAcumulado.dataFim.getTime());

        var execucao = context.dataset.execucaocalculofechamento.collection.firstOrDefault();
        expect(execucao).toBeDefined();

    })

    it('validar execução do processapp de requisição de cálculo de taxas para o mês 12/2014.', () => {

        var instance_id = utils.guid();

        var idUsina = "ALUXG";

        var mes = 12;
        var ano = 2014;

        var entities = [];
        var context = { dataset: {}, event: {} };
        context.event.payload = { mesFechamento: mes, anoFechamento: ano };

        var eventOut = [];
        var eventmanager = {};
        eventmanager.emit = function (evt) { return new Promise((res, rej) => { eventOut.push(evt); res(); }) };

        console.log("INICIO FECHAMENTO 12/2014");

        context.dataset.fechamentomensal = new Stubdataset(entities, []);
        var fechamento = new FechamentoMensal("1", mes, ano, new Date());
        context.dataset.fechamentomensal.add(fechamento);
        context.dataset.execucaocalculofechamento = new Stubdataset(entities);

        context.dataset.usina = new Stubdataset();
        context.dataset.usina.add({ idUsina: idUsina });

        expect(context.event.payload.anoFechamento).toBe(ano);
        try {
            executor.executarCalculoTaxas(context, eventmanager);
        } catch (error) {
            console.log("error: " + error.stack);
        }

        var periodoCalculo = new PeriodoCalculo(mes, ano);
        var periodoAcumulado = new PeriodoCalculo(mes, ano, 60);

        expect(eventOut[0].payload.acumulada).toBeUndefined();
        expect(eventOut[0].payload.idUsina).toBe(idUsina);
        expect(eventOut[0].payload.idFechamento).toBe(fechamento.id);
        expect(eventOut[0].payload.dataInicialEvento.getTime()).toBe(periodoCalculo.dataInicio.getTime());
        expect(eventOut[0].payload.dataFinalEvento.getTime()).toBe(periodoCalculo.dataFim.getTime());

        expect(eventOut[1].payload.acumulada).toBe(true);
        expect(eventOut[1].payload.idUsina).toBe(idUsina);
        expect(eventOut[1].payload.idFechamento).toBe(fechamento.id);
        expect(eventOut[1].payload.dataInicialEvento.getTime()).toBe(periodoAcumulado.dataInicio.getTime());
        expect(eventOut[1].payload.dataFinalEvento.getTime()).toBe(periodoAcumulado.dataFim.getTime());

        var execucao = context.dataset.execucaocalculofechamento.collection.firstOrDefault();
        expect(execucao).toBeDefined();

    })

});

class Stubdataset {

    constructor(entities, dataParam) {
        this.data = dataParam ? dataParam : [];
        this.entities = entities;
    }

    get collection() {
        return Enumerable.from(this.data);
    }

    add(entity) {
        this.data.push(entity);
    }

    insert(entity) {
        this.data.push(entity);
        this.entities.push(entity);
    }
}



