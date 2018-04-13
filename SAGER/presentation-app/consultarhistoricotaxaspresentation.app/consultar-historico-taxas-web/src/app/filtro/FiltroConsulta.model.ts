import { Usina } from '../model/usina';

export class FiltroConsulta {
    constructor(public usina,
        public mesInicial: number, public anoInicial: number, public mesFinal: number, public anoFinal: number, public tipoTaxa) {
    }
}
