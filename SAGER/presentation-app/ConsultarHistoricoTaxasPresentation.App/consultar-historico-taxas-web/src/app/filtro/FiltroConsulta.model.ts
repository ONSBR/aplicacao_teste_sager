import { TipoTaxa } from '../model/tipotaxa';
import { Usina } from '../model/usina';

export class FiltroConsulta {
    constructor(public usina: Usina,
        public dataInicial: Date, public dataFinal: Date, public tipoTaxa: TipoTaxa) {
    }
}
