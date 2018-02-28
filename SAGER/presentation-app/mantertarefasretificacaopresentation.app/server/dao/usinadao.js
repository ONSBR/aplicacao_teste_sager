const config = require('../config');
const DomainPromiseHelper = require('../helpers/domainpromisehelper');

class UsinaDAO {

    constructor() {
        this.domainPromiseHelper = new DomainPromiseHelper();
    }

    listarUsinas() {
        return this.domainPromiseHelper.getDomainPromise(config.URL_USINA_SAGER);
    }

}

module.exports = UsinaDAO;