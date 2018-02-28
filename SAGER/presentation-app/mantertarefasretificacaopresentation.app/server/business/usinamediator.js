const UsinaDAO = require('../dao/usinadao');

class UsinaMediator {

    constructor() {
        this.usinaDAO = new UsinaDAO();
    }

    listarUsinas() {
        return this.usinaDAO.listarUsinas();
    }

}

module.exports = UsinaMediator