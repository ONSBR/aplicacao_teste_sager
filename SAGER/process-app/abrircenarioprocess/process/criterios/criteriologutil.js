class CriterioLogUtil {

    static log(regra) {
        console.log('--------------------------------');
        console.log(`Aplicando critério: ${regra.tipoRegra}`);
        console.log(`regra.regraDe: ${regra.regraDe}`);
        console.log(`regra.regraPara: ${regra.regraPara}`);
        console.log(`regra.dataInicioVigencia: ${regra.dataInicioVigencia}`);
        console.log(`regra.dataFimVigencia: ${regra.dataFimVigencia}`);
        console.log('--------------------------------');
    }

}

module.exports = CriterioLogUtil