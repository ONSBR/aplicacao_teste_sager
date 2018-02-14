import { Usina } from '../model/usina';

export class FiltroConsulta {
    constructor(public usina,
        public dataInicial: Date, public dataFinal: Date, public tipoTaxa) {
    }
}
