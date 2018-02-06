const fileDataMass = require("./testMass/fileDataMass");
const utils = require("../utils");
var utilTest = require("./utilTest");

describe('O SAGER deve calcular as taxas TEIFA e TEI', function () {

    it('validar cálculo da teip para o mês 09/2014, usina ALUXG.', () => {

        utilTest.testarCalculoTaxasMensaisUsinaValores(
            "ALUXG", 9, 2014, fileDataMass.file_mass_uge_ALUXG,
            fileDataMass.file_mass_events_09_2014_ALUXG,
            0.0041358
        );

    })

    it('validar cálculo da teip para o mês 09/2014, usina ALUXG.', () => {

        utilTest.testarCalculoTaxasMensaisUsinaValores(
            "ALUXG", 8, 2014, fileDataMass.file_mass_uge_ALUXG,
            fileDataMass.file_mass_events_08_2014_ALUXG,
            0.0823365
        );

    })

    it('validar cálculo da teip para o mês 09/2014, usina ALUXG.', () => {

        utilTest.testarCalculoTaxasMensaisUsina(
            "ALUXG", fileDataMass.file_mass_uge_ALUXG,
            fileDataMass.file_mass_events_ALUXG_1,
            fileDataMass.file_mass_events_ALUXG_2,
            fileDataMass.file_mass_results_taxes_ALUXG
        );

    })

    /*it('validar cálculo da teip para o mês 12/2014, usina ALUXG.', () => {

        utilTest.testarCalculoTaxasAcumuladasUsina(
            "ALUXG", fileDataMass.file_mass_uge_ALUXG,
            fileDataMass.file_mass_events_ALUXG_1,
            fileDataMass.file_mass_events_ALUXG_2,
            fileDataMass.file_mass_results_taxes_ALUXG
        );

    })*/

    it('validar cálculo da teip para o mês 12/2014, usina ALUXG.', () => {

        /*utilTest.testarCalculoTaxasAcumuladasUsinaValores(
            "ALUXG", 12, 2014, fileDataMass.file_mass_uge_ALUXG,
            fileDataMass.file_mass_events_ALUXG_1,
            fileDataMass.file_mass_events_ALUXG_2,
            0.0186440
        );*/

    })


});
