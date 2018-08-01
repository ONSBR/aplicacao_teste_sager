const CenarioBusiness = require('../business/cenariobusiness');
const Enumerable = require("linq");
describe('CenarioBusiness: ', function () {
    let cenarioBusiness;
    let context;
    let deleteFunction;
    let updateFunction;
    let eventPromiseHelper;
    let putEventFunction;
    let resolve;
    let reject;
    let fork;

    beforeEach(function () {
        cenarioBusiness = new CenarioBusiness();
        deleteFunction = jasmine.createSpy('delete');
        updateFunction = jasmine.createSpy('update');
        resolve = jasmine.createSpy('resolve');
        reject = jasmine.createSpy('reject');
        fork = jasmine.createSpy('fork');
        putEventFunction = jasmine.createSpy('putEventPromise').and.returnValue(Promise.resolve());
        eventPromiseHelper = { putEventPromise: putEventFunction };
        context = {
            dataset: {}
        };
    });

    it('Inativar Cenário:', function () {
        context.dataset.cenario = {
            collection: Enumerable.from([{ id: '1', situacao: 'Ativo' }]),
            delete: deleteFunction
        }
        context.dataset.regracenario = {
            collection: Enumerable.from([{ id: '42' }]),
            delete: deleteFunction
        }

        cenarioBusiness.ativarInativarCenario(context, resolve);

        expect(deleteFunction.calls.count()).toEqual(2);
        expect(deleteFunction).toHaveBeenCalledWith({ id: '1', situacao: 'Ativo' });
        expect(deleteFunction).toHaveBeenCalledWith({ id: '42' });
        expect(resolve).toHaveBeenCalled();
    });

    it('Ativar Cenário:', function () {
        context.dataset.cenario = {
            collection: Enumerable.from([{ nomeCenario: 'cenarioTeste', id: '1', situacao: 'Inativo', justificativa: 'justificativa teste' }]),
            update: updateFunction
        }
        context.dataset.regracenario = {
            collection: Enumerable.from([])
        }
        cenarioBusiness.eventPromiseHelper = eventPromiseHelper;

        cenarioBusiness.ativarInativarCenario(context, resolve, reject, fork);

        expect(updateFunction).toHaveBeenCalledWith({ 
            nomeCenario: 'cenarioTeste', id: '1', situacao: 'Ativo', justificativa: 'justificativa teste', regras: []
        });
        expect(putEventFunction).toHaveBeenCalled();
        expect(resolve).toHaveBeenCalled();
    });

    it('Incorporar Cenário:', function () {
        context.dataset.cenario = {
            collection: Enumerable.from([{ nomeCenario: 'cenarioTeste', id: '1', situacao: 'Ativo' }]),
            update: updateFunction
        }
        cenarioBusiness.eventPromiseHelper = eventPromiseHelper;

        cenarioBusiness.incorporarCenario(context, resolve, reject);

        expect(updateFunction.calls.count()).toEqual(1);
        expect(updateFunction).toHaveBeenCalledWith({ nomeCenario: 'cenarioTeste', id: '1', situacao: 'Incorporado' });
        expect(putEventFunction).toHaveBeenCalledWith({
            name: 'eb60a12f-130d-4b8b-8b0d-a5f94d39cb0b.merge.request',
            payload: {
                branch: 'cenarioTeste'
            }
        });
        expect(resolve).toHaveBeenCalled();
    });

})