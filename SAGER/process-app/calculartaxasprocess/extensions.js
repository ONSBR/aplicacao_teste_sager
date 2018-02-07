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
