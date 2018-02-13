Date.prototype.getTotalSeconds = function() {
    return this.getTime()/1000;
}

Number.prototype.toFixedDown = function(fixed) {
    var numPower = Math.pow(10, fixed); 
    return ~~(this * numPower)/numPower;
};

Number.prototype.toRound = function(fixed) {
    if (!fixed) fixed = 2;
    return parseFloat(this.toFixed(fixed))
};

Number.prototype.zeroFillLeft = function(len) {
    return this.toString().padLeft(len, '0');
};

String.prototype.padFill = function(len, charComplete, left) {
    var value = this;
    return (left?"":value) + charComplete.repeat(len - value.length) + (left?value:"");
};

String.prototype.padLeft = function(len, charComplete) {
    return this.padFill(len, charComplete, true);
};

String.prototype.padRight = function(len, charComplete) {
    return this.padFill(len, charComplete, false);
};