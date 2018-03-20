const extensions = require("./extensions");
const dataEmSegundos_10_2014 = new Date(2014, 9, 1, 0, 0, 0).getTotalSeconds();

class UtilCalculoParametro {

    static gte_10_2014(evento) {
        return evento.dataVerificada.getTotalSeconds() >= dataEmSegundos_10_2014;
    }

}

module.exports = UtilCalculoParametro;
