class CriterioLog {

    static log(regra) {
        console.log('--------------------------------');
        console.log(`Aplicando critério: ${regra.nomeRegra}`);
        console.log(`regra.regraDe: ${regra.regraDe}`);
        console.log(`regra.regraPara: ${regra.regraPara}`);
        console.log(`regra.dataInicioVigencia: ${regra.dataInicioVigencia}`);
        console.log(`regra.dataFimVigencia: ${regra.dataFimVigencia}`);
        console.log('--------------------------------');
    }

}

module.exports = CriterioLog