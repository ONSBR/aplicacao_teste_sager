const EventoDAO = require('../dao/eventodao');
const parseEventosXlsx = require('../helpers/parseeventosxlsx');
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
                        console.log('-------------------');
                        uges = ugesPesquisa;
                        return this.eventoDAO.getEventosPorDataeUGe(this.extrairIdsUges(uges).join(';'),
                            dataInicial.toISOString().slice(0, 10), dataFinal.toISOString().slice(0, 10));
                    }).then(eventos => {
                        resolve(this.downloadPlanilhaEventos(uges, eventos, dataInicial, dataFinal));
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
        console.log('++++++++++');
        let parseFileTemplate = this.parseEventosXlsx.factory(uges, dataInicial, dataFinal, eventos);
        let contentXlsx = parseFileTemplate.parse();
        return contentXlsx;
    }

    extrairIdsUges(uges) {
        return uges.map(uge => uge.idUge);
    }
}

module.exports = EventoMediator