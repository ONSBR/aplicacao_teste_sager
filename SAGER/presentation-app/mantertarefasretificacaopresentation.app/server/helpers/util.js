const moment = require('moment');
const FORMAT_DATE_EXCEL = "DD/MM/YYYY HH:mm:ss";

function dateReviver(key, value) {
    var a;
    if (typeof value === 'string') {
        a = /\d{4}(-|\/)\d{2}(-|\/)\d{2}(((T| )\d{2}:\d{2}:\d{2})?|$)/.exec(value);
        if (a) {
            return moment.parseZone(a[0]).toDate();
        }
    }
    return value;
};

if (!JSON.parse.changed) {
    var jsonParse = JSON.parse;
    JSON.parse = function (str) { return jsonParse(str, dateReviver) };
    JSON.parse.changed = true;
}



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