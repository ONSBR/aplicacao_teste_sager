// TODO devria estar em um projeto de util, verifiquei que tem em vários projetos.

function notExist(d) {
    return d === null || d === undefined;
}
function exist(d) {
    return !notExist(d);
}
function clone(d) {
    return JSON.parse(JSON.stringify(d));
}
function print(s) {
    console.log(s);
}
function convertAll(type, collection) {
    for (var k in collection) {
        collection[k] = castTo(type, collection[k]);
    }
}
function round(val, fixed) {
    if (!fixed) fixed = 2;
    return parseFloat(val.toFixed(fixed))
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
function castTo(baseClass, obj) {
    var instance = new baseClass();
    for (var prop in obj) {
        instance[prop] = obj[prop];
    }
    return instance;
}

function secondToHour(seconds) {
    return seconds > 0 ? seconds / 3600 : 0;
}

function parserFloatPtb(val, defaultVal) {
    return val ? parseFloat(val.replace('.', '').replace(',', '.')) : defaultVal;
}

module.exports = {
    notExist: notExist,
    exist: exist,
    clone: clone,
    print: print,
    convertAll: convertAll,
    guid: guid,
    castTo: castTo,
    round: round,
    secondToHour: secondToHour,
    parserFloatPtb: parserFloatPtb
}