const moment = require('moment');

class Util {

    static textToExcel(value) {
        return value ? value : "";
    }

    static formatDate(date){
        return date? moment(date).format("DD-MM-YYYY HH:mm:ss") : "";    
    }
}

module.exports = Util