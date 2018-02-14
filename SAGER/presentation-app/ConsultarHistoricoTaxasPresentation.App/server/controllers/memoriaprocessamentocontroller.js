const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');
const fs = require('fs');
const Enumerable = require('linq');
const parsexlsx = require('./parse/parsexlsx');

class MemoriaProcessamentoController {

    constructor(domainPromiseHelper) {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    /**
     * @method getMemoriaDeProcessamento
     * @param {Request} request Objeto de request
     * @param {Response} response Objeto de response
     * @description Recupera a memória de processamento .
     */
    getMemoriaDeProcessamento(request, response) {
        let processInstanceId = request.body.id;
        let processMemoryUrl = config.getProcessMemoryUrl(processInstanceId);
        console.log('processMemoryUrl: ' + processMemoryUrl);
        this.domainPromiseHelper.getDomainPromise(processMemoryUrl).
            then(data => { response.send(data); }).
            catch(e => { console.log(`Erro durante a consulta da memória de processamento: ${e.toString()}`) });
    }

    downloadMemoriaProcessamentoXlsx(request, response) {

        let processInstanceId = request.query.idinstance;
        let idtaxa = request.query.idtaxa;
        let processMemoryUrl = config.getProcessMemoryUrl(processInstanceId);
        console.log('processMemoryUrl: ' + processMemoryUrl);
        this.domainPromiseHelper.getDomainPromise(processMemoryUrl).
            then(data => {
                try {

                    var taxas = Enumerable.from(data.dataset.entities.taxa);
                    var taxa = taxas.first(it => { return it.id == idtaxa; });

                    var parseFileTemplate = parsexlsx.factory(data, taxa);
                    var contentXlsx = parseFileTemplate.parse();

                    response.setHeader('Content-disposition', 'attachment; filename=memoriaprocessamento_' +
                        processInstanceId + '_' + parseFileTemplate.suffixNameFile + '.xlsx');
                    //response.setHeader('Content-Length', contentXlsx.length);
                    response.write(contentXlsx, 'binary');
                    response.end();
                }
                catch (error) {
                    console.log(error);
                    response.send(400);
                }
            }).catch(e => { console.log(`Erro durante a consulta da memória de processamento: ${e.toString()}`) });
    }

}



module.exports = MemoriaProcessamentoController