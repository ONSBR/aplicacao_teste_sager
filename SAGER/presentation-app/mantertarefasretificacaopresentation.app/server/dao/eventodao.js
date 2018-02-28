const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const config = require('../config');

class EventoDAO {

    constructor() {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    pesquisarUGEs(idsUsinas) {
        let urlUnidadesGeradorasAPartirUsina = this.getUrlUnidadesGeradorasAPartirUsina(idsUsinas);
        console.log('urlUnidadesGeradorasAPartirUsina = ' + urlUnidadesGeradorasAPartirUsina);
        return this.domainPromiseHelper.getDomainPromise(urlUnidadesGeradorasAPartirUsina);
    }

    getUrlUnidadesGeradorasAPartirUsina(idsUsinas) {
        return config.getUrlUnidadesGeradorasAPartirUsina(idsUsinas);
    }

    getEventosPorDataeUGe(idsUGes, dataInicial, dataFinal) {
        let urlFiltroEventos = this.getUrlFiltroEventoPorDataseUGes(idsUGes, dataInicial, dataFinal);
        console.log('urlFiltroEventos = ' + urlFiltroEventos);
        return this.domainPromiseHelper.getDomainPromise(urlFiltroEventos);
    }

    getUrlFiltroEventoPorDataseUGes(idsUGes, dataInicial, dataFinal) {
        return config.getUrlFiltroEventoPorDataseUGes(idsUGes, dataInicial, dataFinal);
    }

}

module.exports = EventoDAO