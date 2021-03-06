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

    consultarEventoMudancaEstadoPorIds(idsEventos) {
        let strIdsEventos = idsEventos.toArray().join(';');
        let urlConsultaEventoMudancaEstadoPorIds = config.getUrlConsultaEventoMudancaEstadoPorIds(strIdsEventos);
        console.log('urlConsultaEventoMudancaEstadoPorIds = ' + urlConsultaEventoMudancaEstadoPorIds);
        return this.domainPromiseHelper.getDomainPromise(urlConsultaEventoMudancaEstadoPorIds);
    }

    consultarFechamentosPorMesAno(mesFechamento, anoFechamento) {
        let urlConsultaFechamentosPorMesAno = config.getUrlConsultaFechamentosPorMesAno(mesFechamento, anoFechamento);
        console.log('urlConsultaFechamentosPorMesAno = ' + urlConsultaFechamentosPorMesAno);
        return this.domainPromiseHelper.getDomainPromise(urlConsultaFechamentosPorMesAno);
    }

    consultarEventosMenorQueData(data) {
        let urlEventosMenorQueData = config.getUrlEventosMenorQueData(data.toISOString().slice(0, 19).replace('T', ' '));
        console.log(`urlEventosMenorQueData = ${urlEventosMenorQueData}`);
        return this.domainPromiseHelper.getDomainPromise(urlEventosMenorQueData);
    }

    consultarEventosMaiorQueData(data) {
        let urlEventosMaiorQueData = config.getUrlEventosMaiorQueData(data.toISOString().slice(0, 19).replace('T', ' '));
        console.log(`urlEventosMaiorQueData = ${urlEventosMaiorQueData}`);
        return this.domainPromiseHelper.getDomainPromise(urlEventosMaiorQueData);
    }

    persistEventosMudancaEstado(eventos) {
        let url = config.getUrlPersist();
        console.log('urlPersist = ' + url);
        let promiseUpdate = this.domainPromiseHelper.postDomainPromise(url, eventos);
        return promiseUpdate;
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