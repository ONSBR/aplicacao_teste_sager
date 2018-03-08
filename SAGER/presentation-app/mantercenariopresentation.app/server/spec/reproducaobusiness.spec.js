/*describe('ReproducaoBusiness: ', function () {
    
    let ReproducaoBusiness = require('../business/reproducaobusiness');
    let config = require('../config');
    let corePromiseHelper;
    let domainPromiseHelper;
    let result;
    let fs = require('fs');
    let parsexlsx = require('../controllers/parse/parsereproducaoxlsx');
    
    beforeEach(function () {
        
        result = { rescore: null, entity: null };

        corePromiseHelper = {
            getCorePromise: function (entity) {
                result.entity = entity;
                return { then: (func) => { func(result.rescore) } };
            }
        }

        domainPromiseHelper = {
            getDomainPromise: function (url) {
                return new Promise((res, rej) => { 
                    res(result[url]) 
                } );
            }
        }; 

        reproducaoBusiness = new ReproducaoBusiness();
        reproducaoBusiness.corePromiseHelper = corePromiseHelper;
        reproducaoBusiness.domainPromiseHelper = domainPromiseHelper;
    });
    
    it('Listar reproduções.', () => {
        
        result.rescore = "rescore";

        reproducaoBusiness.listarReproducoes().then(res => {
            expect(res).toEqual(result.rescore);
        });
    });

    it('Comparar memórias da reprodução, com resultados iguais.', () => {
        
        var processInstanceOriginalId = 'f4562c77-dabf-4789-a847-21f44830de45';
        var processInstanceReproductedId = '461189d8-96f6-4f1c-adff-f89af9be5acb';
        var taxaId = 'a598c277-f9f9-20b4-e56a-415da8a026c9';

        var memoryorg = fs.readFileSync(`spec/datatest/memory_orig_${processInstanceOriginalId}.json`, 'utf8');
        var memoryrep = fs.readFileSync(`spec/datatest/memory_rep_${processInstanceReproductedId}.json`, 'utf8');
        
        let processMemoryOriginalUrl = config.getProcessMemoryUrl(processInstanceOriginalId);
        let processMemoryReproductedUrl = config.getProcessMemoryUrl(processInstanceReproductedId);

        result[processMemoryOriginalUrl] = JSON.parse(memoryorg);
        result[processMemoryReproductedUrl] = JSON.parse(memoryrep);

        reproducaoBusiness.compararMemoriasReproducao(processInstanceOriginalId, processInstanceReproductedId, taxaId).then(res => {
            
            // Testa o resultado da comparação das memórias
            expectExecucao(res);
            expect(res.taxaComparacao.reproducao).toBeUndefined();
            
            res.parametrosComparacao.forEach((it) => {
                expect(it.reproducao).toBeUndefined();
            });

            expect(res.eventosComparacao.length).toBe(0);

            // Testes de parser xlsx
            var parser = parsexlsx.factory(res);
            parser.parse();
            expect(parser.sheet["F5"]).toBeUndefined();
            expect(parser.sheet["I15"]).toBeUndefined();
            expect(parser.sheet["A21"]).toBeUndefined();
            expect(parser.sheet["M21"]).toBeUndefined();
            
        });
    });

    it('Comparar memórias da reprodução, com valores de taxas diferentes.', () => {
        
        var processInstanceOriginalId = 'f4562c77-dabf-4789-a847-21f44830de45';
        var processInstanceReproductedId = '921c84de-53b0-4e16-9ef8-bbd5dadaac8b';
        var taxaId = 'a598c277-f9f9-20b4-e56a-415da8a026c9';

        var memoryorg = fs.readFileSync(`spec/datatest/memory_orig_${processInstanceOriginalId}.json`, 'utf8');
        var memoryrep = fs.readFileSync(`spec/datatest/memory_taxa_${processInstanceReproductedId}.json`, 'utf8');
        
        let processMemoryOriginalUrl = config.getProcessMemoryUrl(processInstanceOriginalId);
        let processMemoryReproductedUrl = config.getProcessMemoryUrl(processInstanceReproductedId);

        result[processMemoryOriginalUrl] = JSON.parse(memoryorg);
        result[processMemoryReproductedUrl] = JSON.parse(memoryrep);

        reproducaoBusiness.compararMemoriasReproducao(processInstanceOriginalId, processInstanceReproductedId, taxaId).then(res => {
            
            // Testa o resultado da comparação das memórias
            expectExecucao(res);
            expect(res.taxaComparacao.reproducao).toBe(1.0037074372759855);
            
            res.parametrosComparacao.forEach((it) => {
                expect(it.reproducao).toBeUndefined();
            });

            expect(res.eventosComparacao.length).toBe(0);

            // Testes de parser xlsx
            var parser = parsexlsx.factory(res);
            parser.parse();
            expect(parser.sheet["F5"].v).toBe(1.0037074372759855);
            expect(parser.sheet["I15"]).toBeUndefined();
            expect(parser.sheet["A21"]).toBeUndefined();
            expect(parser.sheet["M21"]).toBeUndefined();
            
        });
    });

    it('Comparar memórias da reprodução, com valores de taxas diferentes com resultado de parâmetros diferentes.', () => {
        
        var processInstanceOriginalId = 'f4562c77-dabf-4789-a847-21f44830de45';
        var processInstanceReproductedId = '0c7bd4c8-60c0-43ad-9eb1-628938b63577';
        var taxaId = 'a598c277-f9f9-20b4-e56a-415da8a026c9';

        var memoryorg = fs.readFileSync(`spec/datatest/memory_orig_${processInstanceOriginalId}.json`, 'utf8');
        var memoryrep = fs.readFileSync(`spec/datatest/memory_param_${processInstanceReproductedId}.json`, 'utf8');
        
        let processMemoryOriginalUrl = config.getProcessMemoryUrl(processInstanceOriginalId);
        let processMemoryReproductedUrl = config.getProcessMemoryUrl(processInstanceReproductedId);

        result[processMemoryOriginalUrl] = JSON.parse(memoryorg);
        result[processMemoryReproductedUrl] = JSON.parse(memoryrep);

        reproducaoBusiness.compararMemoriasReproducao(processInstanceOriginalId, processInstanceReproductedId, taxaId).then(res => {
            
            // Testa o resultado da comparação das memórias
            expectExecucao(res);
            expect(res.taxaComparacao.reproducao).toBe(0.0031212664277180404);
            
            res.parametrosComparacao.forEach((it, idx) => {
                if (idx == 37) {
                    expect(it.reproducao.valorParametro).toBe(8.133333333333333);
                    expect(it.reproducao.idTipoParametro).toBe('HDP');
                    expect(it.reproducao.idUge).toBe('ALUXG-0UG5');
                    expect(it.reproducao.idFechamento).toBe('6ff83a19-a0b6-4967-8e05-d0761aa15c51');
                } else {
                    expect(it.reproducao).toBeUndefined();
                }
            });

            expect(res.eventosComparacao.length).toBe(0);

            // Testes de parser xlsx
            var parser = parsexlsx.factory(res);
            parser.parse();
            expect(parser.sheet["F5"].v).toBe(0.0031212664277180404);
            expect(parser.sheet["I15"].v).toBe(8.133333333333333);
            expect(parser.sheet["A21"]).toBeUndefined();
            expect(parser.sheet["M21"]).toBeUndefined();
            
        });
    });

    it('Comparar memórias da reprodução, com valores de taxas diferentes, com resultado de parâmetros diferentes, por conta de mudança de eventos.', () => {
        
        var processInstanceOriginalId = 'f4562c77-dabf-4789-a847-21f44830de45';
        var processInstanceReproductedId = '0825e147-aa02-4312-9442-688e50c955dc';
        var taxaId = 'a598c277-f9f9-20b4-e56a-415da8a026c9';

        var memoryorg = fs.readFileSync(`spec/datatest/memory_orig_${processInstanceOriginalId}.json`, 'utf8');
        var memoryrep = fs.readFileSync(`spec/datatest/memory_evt_${processInstanceReproductedId}.json`, 'utf8');
        
        let processMemoryOriginalUrl = config.getProcessMemoryUrl(processInstanceOriginalId);
        let processMemoryReproductedUrl = config.getProcessMemoryUrl(processInstanceReproductedId);

        result[processMemoryOriginalUrl] = JSON.parse(memoryorg);
        result[processMemoryReproductedUrl] = JSON.parse(memoryrep);

        reproducaoBusiness.compararMemoriasReproducao(processInstanceOriginalId, processInstanceReproductedId, taxaId).then(res => {
            
            // Testa o resultado da comparação das memórias
            expectExecucao(res);
            expect(res.taxaComparacao.reproducao).toBe(0.0031212664277180404);
            
            res.parametrosComparacao.forEach((it, idx) => {
                if (idx == 37) {
                    expect(it.reproducao.valorParametro).toBe(8.133333333333333);
                    expect(it.reproducao.idTipoParametro).toBe('HDP');
                    expect(it.reproducao.idUge).toBe('ALUXG-0UG5');
                    expect(it.reproducao.idFechamento).toBe('6ff83a19-a0b6-4967-8e05-d0761aa15c51');
                } else {
                    expect(it.reproducao).toBeUndefined();
                }
            });

            expect(res.eventosComparacao.length).toBe(1);
            var reproducao = res.eventosComparacao[0].reproducao;
            expect(reproducao.idClassificacaoOrigem).toBe('TES');

            expect(reproducao.idEstadoOperativo).toBeUndefined();
            expect(reproducao.idCondicaoOperativa).toBeUndefined();
            expect(reproducao.dataVerificada).toBeUndefined();
            expect(reproducao.potenciaDisponivel).toBeUndefined();

            var original = res.eventosComparacao[0].original;
            expect(original.idClassificacaoOrigem).toBe('GAC');

            expect(original.idEvento).toBe('2445055');
            expect(original.idEstadoOperativo).toBe('DUR');
            expect(original.idCondicaoOperativa).toBeNull();
            expect(original.potenciaDisponivel).toBe(0);

            // Testes de parser xlsx
            var parser = parsexlsx.factory(res);
            parser.parse();
            expect(parser.sheet["F5"].v).toBe(0.0031212664277180404);
            expect(parser.sheet["I15"].v).toBe(8.133333333333333);
            expect(parser.sheet["M21"].v).toBe('TES');

        });
    });

});

function expectExecucao(res) {
    expect(res.execucaoOriginal.dataInicio.getTime()).toBe(res.execucaoReproducao.dataInicio.getTime());
    expect(res.execucaoOriginal.idFechamento).toBe(res.execucaoReproducao.idFechamento);
    expect(res.execucaoOriginal.idCenario).toBe(res.execucaoReproducao.idCenario);
    expect(res.execucaoOriginal.idTarefa).toBe(res.execucaoReproducao.idTarefa);
    expect(res.execucaoOriginal.protocolo).toBe(res.execucaoReproducao.protocolo);
}*/