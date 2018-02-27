class ResultadoComparacaoMemoriaCalculoTaxa {
    
    //parametrosTaxa
}

module.exports.compararMemoriaCalculoTaxa = function(contextOriginal, contextReproducted) {

    var parametrosOriginais = contextOriginal.dataset.parametrotaxa;
    var parametrosReproducted = contextReproducted.dataset.parametrotaxa;

    return new ResultadoComparacaoMemoriaCalculoTaxa();
}