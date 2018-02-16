const moment = require('moment');

function dateReviver(key, value) {
    var a;
    if (typeof value === 'string') {
        a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (a) {
            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                +a[5], +a[6]));
        }
    }
    return value;
};

if (!JSON.parse.changed) {
    var jsonParse = JSON.parse;
    JSON.parse = function (str) { return jsonParse(str, dateReviver) };
    JSON.parse.changed = true;
}

module.exports.textToExcel = function (val) {
    return val ? val : "";
}

module.exports.numberToExcel = function (val) {
    return val ? val : 0;
}

module.exports.formatDate = function (date) {
    return date? moment(date).format("DD-MM-YYYY HH:mm:ss") : "";
}

Number.prototype.zeroFillLeft = function (len) {
    return this.toString().padLeft(len, '0');
};

String.prototype.padFill = function (len, charComplete, left) {
    var value = this;
    return (left ? "" : value) + charComplete.repeat(len - value.length) + (left ? value : "");
};

String.prototype.padLeft = function (len, charComplete) {
    return this.padFill(len, charComplete, true);
};

String.prototype.padRight = function (len, charComplete) {
    return this.padFill(len, charComplete, false);
};