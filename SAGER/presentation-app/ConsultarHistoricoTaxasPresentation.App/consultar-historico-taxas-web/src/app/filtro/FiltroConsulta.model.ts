import { TipoTaxa } from '../model/tipotaxa';

export class FiltroConsulta {
    constructor(public dataInicial: Date, public dataFinal: Date, public tipoTaxa: TipoTaxa) {
    }
}
