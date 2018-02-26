const moment = require('moment');

class Util {

    static textToExcel(value) {
        return value ? value : '';
    }

    static formatDate(date, format) {
        return date ? moment(date).format(format) : '';
    }
}

module.exports = Util