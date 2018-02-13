const EventoMudancaEstadoOperativo = require("../process/entities/eventomudancaestadooperativo");
const UnidadeGeradora = require("../process/entities/unidadegeradora");
const utils = require("../utils");
const CalculoTaxasPeriodoUge = require("../process/business/calculotaxasperiodouge");
const CalculoTaxasPeriodoUsina = require("../process/business/calculotaxasperiodousina");
const PeriodoCalculo = require("../process/business/periodocalculo");
const Enumerable = require('linq');
const moment = require('moment');
const extensions = require("../extensions");

class ItemComparacaoTaxas {

    constructor(mes, ano, valorCalc, valorResult, calculoUsina) {
        this.mes = mes;
        this.ano = ano;
        this.valorCalc = valorCalc;
        this.valorResult = valorResult;
        this.calculoUsina = calculoUsina;
    }
}

class ComparacaoTaxas {

    constructor(label) {
        this.label = label;
        this.teipiguais = [];
        this.teipdiferentes = [];
        this.teifaiguais = [];
        this.teifadiferentes = [];
    }

    toString() {
        return ("[Estatísticas comparação Taxas" + (this.label ? " " + this.label : "") + "] teipiguais: " + this.teipiguais.length
            + ", teipdiferentes: " + this.teipdiferentes.length
            + ", teifaiguais: " + this.teifaiguais.length
            + ", teifadiferentes: " + this.teifadiferentes.length);
    }
}

module.exports = class UtilTest {

    static testarValidacaoEventosParametroCalculo(mes, ano, staticDataMass, calculoParametroType, resultArray) {

        var uge = new UnidadeGeradora();

        var calculo = calculoParametroType(uge, new PeriodoCalculo(mes, ano));

        var listEventos = staticDataMass(uge);

        var validadoArray = [];
        listEventos.forEach(element => {
            validadoArray.push(calculo.validarEvento(element));
        });

        for (var i = 0; i < validadoArray.length; i++) {

            expect(validadoArray[i]).toBe(resultArray[i]);
        }
    }

    static testarCalculoEventos(mes, ano, staticDataMass, calculoParametroType, result) {

        var uge = new UnidadeGeradora();

        var calculo = calculoParametroType(uge, new PeriodoCalculo(mes, ano));

        var listEventos = staticDataMass(uge);

        var eventoFinalizacao = new EventoMudancaEstadoOperativo();
        eventoFinalizacao.dataVerificada = new PeriodoCalculo(mes, ano).dataFim;
        EventoMudancaEstadoOperativo.gerarDataVerificadaEmSegundos(eventoFinalizacao);

        listEventos.push(eventoFinalizacao);

        listEventos.forEach(element => {
            calculo.computarEvento(element);
        });

        var qtdHoras = utils.round(calculo.qtdHoras, 2);

        expect(qtdHoras).toEqual(result);

    }

    static testarCalculoTaxasMensaisUsinaValores(idUsina, mes, ano, massUge, massEvents, resultadoTeip) {

        Promise.all(
            [massUge(), massEvents()]).then(results => {

                var uges = Enumerable.from(results[0]);
                var eventos = Enumerable.from(results[1]);

                UtilTest.executarCalculoTaxasMensaisUsinaMesAno(idUsina, mes, ano,
                    uges, eventos, resultadoTeip);

            }).catch(error => {
                console.log("error: " + error.stack);
                expect(error).toBe(null);
            });
    }

    static testarCalculoTaxasAcumuladasUsinaValores(idUsina, mes, ano, massUge, massEvents_1, massEvents_2, resultadoTeip) {

        Promise.all(
            [massUge(), massEvents_1(), massEvents_2()]).then(results => {

                var uges = Enumerable.from(results[0]);
                var eventos = Enumerable.from(results[1].concat(results[2]));

                UtilTest.executarCalculoTaxasAcumuladasUsinaMesAno(idUsina, mes, ano,
                    uges, eventos, resultadoTeip);

            }).catch(error => {
                console.log("error: " + error.stack);
                expect(error).toBe(null);
            });
    }

    static executarCalculoTaxasMensaisUsinaMesAno(idUsina, mes, ano, uges, eventosEstOper,
        resultadoTeipMes, resultadoTeifaMes, comparacaoTaxas) {

        var periodoCalculo = new PeriodoCalculo(mes, ano);

        eventosEstOper = eventosEstOper.where(it => {
            return it.dataVerificadaEmSegundos >= periodoCalculo.dataInicioEmSegundos &&
                it.dataVerificadaEmSegundos < periodoCalculo.dataFimEmSegundos;
        });

        var calculosUges = [];
        uges.forEach(uge => {
            var calculoUge = new CalculoTaxasPeriodoUge(
                periodoCalculo, uge,
                eventosEstOper.where(it => { return it.idUge == uge.idUge })
            );
            calculosUges.push(calculoUge);
        });

        var calculoUsina = new CalculoTaxasPeriodoUsina(periodoCalculo, idUsina, calculosUges);
        calculoUsina.calcular();

        if (resultadoTeipMes) {

            if (comparacaoTaxas) {
                UtilTest.compararValoresTaxasEstatistica(
                    calculoUsina.valorTeip, resultadoTeipMes,
                    comparacaoTaxas, mes, ano, calculoUsina,
                    comparacaoTaxas.teipiguais, comparacaoTaxas.teipdiferentes
                );
            } else {
                expect(UtilTest.valueToCompare(calculoUsina.valorTeip)).
                    toBe(UtilTest.valueToCompare(resultadoTeipMes));
            }
        }

        if (resultadoTeifaMes) {

            if (comparacaoTaxas) {
                UtilTest.compararValoresTaxasEstatistica(
                    calculoUsina.valorTeifa, resultadoTeifaMes,
                    comparacaoTaxas, mes, ano, calculoUsina,
                    comparacaoTaxas.teifaiguais, comparacaoTaxas.teifadiferentes
                );
            } else {
                expect(UtilTest.valueToCompare(calculoUsina.valorTeifa)).
                    toBe(UtilTest.valueToCompare(resultadoTeifaMes));
            }
        }
    }

    static executarCalculoTaxasAcumuladasUsinaMesAno(idUsina, mes, ano, uges, eventosEstOper,
        resultadoTeipMes, resultadoTeifaMes, comparacaoTaxas) {

        var periodoAcumulado = new PeriodoCalculo(mes, ano, 60);

        eventosEstOper = eventosEstOper.where(it => {
            return it.dataVerificadaEmSegundos >= periodoAcumulado.dataInicioEmSegundos &&
                it.dataVerificadaEmSegundos < periodoAcumulado.dataFimEmSegundos;
        });

        //console.log("eventosEstOper.length: " + eventosEstOper.toArray().length);

        var calculosUges = [];
        uges.forEach(uge => {

            periodoAcumulado.mesAnoInterval.forEach(mesAno => {
                
                var periodoCalculo = new PeriodoCalculo(mesAno.mes, mesAno.ano);
                var calculoUge = new CalculoTaxasPeriodoUge(
                    periodoCalculo, uge,
                    eventosEstOper.where(it => {
                        return it.idUge == uge.idUge &&
                            it.dataVerificadaEmSegundos >= periodoCalculo.dataInicioEmSegundos &&
                            it.dataVerificadaEmSegundos < periodoCalculo.dataFimEmSegundos
                    })
                );
                calculosUges.push(calculoUge);
            });
        });

        var calculoUsina = new CalculoTaxasPeriodoUsina(periodoAcumulado, idUsina, calculosUges);
        calculoUsina.calcular();

        //console.log(calculoUsina.toString());

        if (resultadoTeipMes) {

            if (comparacaoTaxas) {
                UtilTest.compararValoresTaxasEstatistica(
                    calculoUsina.valorTeip, resultadoTeipMes,
                    comparacaoTaxas, mes, ano, calculoUsina,
                    comparacaoTaxas.teipiguais, comparacaoTaxas.teipdiferentes
                );
            } else {
                expect(UtilTest.valueToCompare(calculoUsina.valorTeip)).
                    toBe(UtilTest.valueToCompare(resultadoTeipMes));
            }
        }

        if (resultadoTeifaMes) {

            if (comparacaoTaxas) {
                UtilTest.compararValoresTaxasEstatistica(
                    calculoUsina.valorTeifa, resultadoTeifaMes,
                    comparacaoTaxas, mes, ano, calculoUsina,
                    comparacaoTaxas.teifaiguais, comparacaoTaxas.teifadiferentes
                );
            } else {
                expect(UtilTest.valueToCompare(calculoUsina.valorTeifa)).
                    toBe(UtilTest.valueToCompare(resultadoTeifaMes));
            }
        }
    }

    static valueToCompare(valor1) {
        return valor1.toRound(7);
    }

    static compararValoresTaxasEstatistica(valor1, valor2, comparacaoTaxas,
        mes, ano, calculoUsina, listaiguais, listadiferentes) {

        var valor1Round = UtilTest.valueToCompare(valor1);
        var valor2Round = UtilTest.valueToCompare(valor2);

        var item = new ItemComparacaoTaxas(mes, ano, valor1Round, valor2Round, calculoUsina);
        if (valor1Round == valor2Round) {
            listaiguais.push(item);
        } else {
            listadiferentes.push(item);
        }
    }

    static testarCalculoTaxasMensaisUsina(idUsina, massUge, massEvents_1, massEvents_2, massResults) {

        var comparacaoTaxas = new ComparacaoTaxas("Mensal");

        Promise.all([massUge(), massEvents_1(), massEvents_2(), massResults()]).then(results => {

            var uges = Enumerable.from(results[0]);
            var eventos = Enumerable.from(results[1].concat(results[2]));
            var resultados = Enumerable.from(results[3]);

            resultados.forEach(resultado => {

                //if (resultado.ano < 2013) {
                UtilTest.executarCalculoTaxasMensaisUsinaMesAno(
                    idUsina, resultado.mes, resultado.ano,
                    uges, eventos, resultado.teipmes, resultado.teifames,
                    comparacaoTaxas);
                //}
            });

            console.log(comparacaoTaxas.toString());

            /*console.log("LOG ERROR");
            comparacaoTaxas.teipdiferentes.forEach(it => {
                console.log("\nCalculoUsina: " + it.calculoUsina.toString().replace(new RegExp("{\"idUge\"", 'g'), "\n{\"idUge\""));
            });
            console.log("FIM LOG ERROR");*/

            //expect(comparacaoTaxas.teipdiferentes.length).toBe(0);
            //expect(comparacaoTaxas.teifadiferentes.length).toBe(0);

        }).catch(error => {
            console.error("error: " + error.stack);
            expect(error).toBe(null);
        });

    }

    static testarCalculoTaxasAcumuladasUsina(idUsina, massUge, massEvents_1, massEvents_2, massResults) {

        var comparacaoTaxas = new ComparacaoTaxas("Acumulada");

        Promise.all([massUge(), massEvents_1(), massEvents_2(), massResults()]).then(results => {

            var uges = Enumerable.from(results[0]);
            var eventos = Enumerable.from(results[1].concat(results[2]));
            var resultados = Enumerable.from(results[3]);

            resultados.forEach(resultado => {

                if (resultado.ano >= 2010) {
                    UtilTest.executarCalculoTaxasAcumuladasUsinaMesAno(
                        idUsina, resultado.mes, resultado.ano,
                        uges, eventos, resultado.teipacum, resultado.teifaacum,
                        comparacaoTaxas);
                }
            });

            console.log(comparacaoTaxas.toString());

        }).catch(error => {
            console.error("error: " + error.stack);
            expect(error).toBe(null);
        });

    }
}

module.exports.Stubdataset = class Stubdataset {

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

