const moment = require('moment');
const FORMAT_DATE_EXCEL = "DD/MM/YYYY HH:mm:ss";

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

    static excelStrToDate(str) {
        return moment(str, FORMAT_DATE_EXCEL).toDate();
    }

    static dateToExcelStr(date) {
        return date ? moment(date).format(FORMAT_DATE_EXCEL) : ''
    }
}

module.exports = Util