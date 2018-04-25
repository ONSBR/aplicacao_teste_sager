const EventoDAO = require('../dao/eventodao');
const parseEventosXlsx = require('../helpers/parseeventosxlsx');
const Enumerable = require('linq');

class EventoMediator {

    constructor() {
        this.eventoDAO = new EventoDAO();
        this.parseEventosXlsx = parseEventosXlsx;
    }

    pesquisarEventos(idsUsinas, dataInicial, dataFinal) {
        return new Promise((resolve, reject) => {
            try {
                let uges;
                this.eventoDAO.pesquisarUGEs(idsUsinas).
                    then(ugesPesquisa => {
                        uges = ugesPesquisa;
                        return this.eventoDAO.getEventosPorDataeUGe(this.extrairIdsUges(uges).join(';'),
                            dataInicial.toISOString().slice(0, 10), dataFinal.toISOString().slice(0, 10));
                    }).then(eventos => {
                        eventos = Enumerable.from(eventos);
                        eventos = eventos.orderBy(it => { 
                            if (it.dataVerificada && !it.dataVerificadaEmSegundos) {
                                it.dataVerificadaEmSegundos = it.dataVerificada.getTime()/1000;
                            }
                            return it.idUge + "-" + it.dataVerificadaEmSegundos; 
                        })
                        resolve(this.downloadPlanilhaEventos(uges, eventos.toArray(), dataInicial, dataFinal));
                    }).
                    catch(error => {
                        console.log(`Erro durante a consulta de eventos: ${error.toString()}`);
                        reject(error);
                    });
            } catch (error) {
                console.log(`Erro durante a consulta de eventos: ${error.toString()}`);
                reject(error);
            }
        });
    }

    downloadPlanilhaEventos(uges, eventos, dataInicial, dataFinal) {
        let parseFileTemplate = this.parseEventosXlsx.factory(uges, dataInicial, dataFinal, eventos);
        let contentXlsx = parseFileTemplate.parse();
        return contentXlsx;
    }

    extrairIdsUges(uges) {
        return uges.map(uge => uge.idUge);
    }
}

module.exports = EventoMediator