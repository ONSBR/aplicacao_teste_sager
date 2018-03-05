const moment = require('moment');

class Util {

    static textToExcel(value) {
        return value ? value : '';
    }

    static formatDate(date, format) {
        return date ? moment(date).format(format) : '';
    }

    static stringToDate(strDate, format) {
        return strDate ? moment(strDate, format, true).format() : '';
    }
}

module.exports = Util