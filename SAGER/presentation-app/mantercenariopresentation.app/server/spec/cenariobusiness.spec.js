describe('CenarioBusiness: ', function () {
    
    let config = require('../config');
    let CenarioBusiness = require('../business/cenariobusiness');
    let domainPromiseHelper;
    let result;

    let datatest;
    
    beforeEach(function () {
        
        result = { };

        var promisefake = function (url, data) {
            return new Promise((res, rej) => {
                result[url + 'res'] = data; 
                res(result[url]);
            } ).catch(error => {
                console.log(`[ERROR]: Error de teste [${error.toString()}]`);
            });
        };

        domainPromiseHelper = {
            getDomainPromise: promisefake,
            postDomainPromise: promisefake
        }; 

        cenarioBusiness = new CenarioBusiness();
        cenarioBusiness.domainPromiseHelper = domainPromiseHelper;

        datatest = {};
        generateDataTest(datatest);
    });
    
    it('Alterar cenário.', () => {
        
        var cenariobd = datatest.cenariobd;
        var cenario = datatest.cenario;

        var urlCenario = config.getUrlFiltroCenarioPorId(cenariobd.id);
        var urlRegras = config.getUrlFiltroRegrasPorIdCenario(cenariobd.id);

        result[urlCenario] = [cenariobd];
        result[urlRegras] = cenariobd.regras;
        
        cenarioBusiness.alterarCenario(cenario).then(res => {
            
            var listapersist = result[config.URL_CENARIO_SAGER + 'res'];

            var cenariotest = listapersist[0];
            var regra1 = listapersist[1];
            var regra2 = listapersist[2];
            var regra3 = listapersist[3];

            expect(cenariotest.nomeCenario).toEqual(cenario.nomeCenario);
            expect(cenariotest.dataInicioVigencia).toEqual(cenario.dataInicioVigencia);
            expect(cenariotest.dataFimVigencia).toEqual(cenario.dataFimVigencia);
            expect(cenariotest.justificativa).toEqual(cenario.justificativa);
            expect(cenariotest._metadata.changeTrack).toEqual("update");

            expect(regra1.nomeRegra).toEqual(cenario.regras[0].nomeRegra);
            expect(regra1.regraDe).toEqual(cenario.regras[0].regraDe);
            expect(regra1.regraPara).toEqual(cenario.regras[0].regraPara);
            expect(regra1.tipoRegra).toEqual(cenario.regras[0].tipoRegra);
            expect(regra1._metadata.changeTrack).toEqual("update");

            expect(regra2._metadata.changeTrack).toEqual("destroy");

            expect(regra3.id).toBeUndefined();
            expect(regra3.nomeRegra).toEqual(cenario.regras[1].nomeRegra);
            expect(regra3.regraDe).toEqual(cenario.regras[1].regraDe);
            expect(regra3.regraPara).toEqual(cenario.regras[1].regraPara);
            expect(regra3.tipoRegra).toEqual(cenario.regras[1].tipoRegra);
            expect(regra3._metadata.changeTrack).toEqual("create");

        });
    });


});

function generateDataTest(datatest) {

    datatest.cenariobd = {
        id: "1",
        nomeCenario: "nomeCenario_bd",  
        dataInicioVigencia: Date.now,
        dataFimVigencia: Date.now,
        justificativa: "justificativa_bd",
        _metadata: { type: "cenario" },
        regras: [
            { 
                id: "1",
                nomeRegra: "nomeRegra_bd_1",
                regraDe: "regraDe_bd_1",
                regraPara: "regraPara_bd_1",
                tipoRegra: "tipoRegra_bd_1",
                _metadata: { type: "regracenario" }
            }, {
                id: "2",
                nomeRegra: "nomeRegra_bd_2",
                regraDe: "regraDe_bd_2",
                regraPara: "regraPara_bd_2",
                tipoRegra: "tipoRegra_bd_2",
                _metadata: { type: "regracenario" }
            }
        ]
    };
    
    datatest.cenario = { 
        id: "1",
        nomeCenario: "nomeCenario",  
        dataInicioVigencia: Date.now,
        dataFimVigencia: Date.now,
        justificativa: "justificativa",
        regras: [
            { 
                id: "1",
                nomeRegra: "nomeRegra",
                regraDe: "regraDe",
                regraPara: "regraPara",
                tipoRegra: "tipoRegra"
            }, {
                nomeRegra: "nomeRegra_2",
                regraDe: "regraDe_2",
                regraPara: "regraPara_2",
                tipoRegra: "tipoRegra_2"
            }
        ]
    };

}