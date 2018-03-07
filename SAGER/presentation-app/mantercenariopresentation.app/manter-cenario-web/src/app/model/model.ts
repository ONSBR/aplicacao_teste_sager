export class Cenario {
    
    public id: string;
    public nomeCenario: string;
    public dataInicioVigencia: Date;
    public dataFimVigencia: Date;
    public justificativa: string;
    public situacao: SituacaoCenario;

    public regras: RegraCritica[] = [];

    constructor() {
    }
}

export class RegraCritica {

    nomeRegra: string;
    regraDe: string;
    regraPara: string;
    tipoRegra: TipoRegra;

}

export enum TipoRegra {
    PotenciaDisponivel = 'PotenciaDisponivel'
}

export enum SituacaoCenario {
    Ativo = 'Ativo',
    Incorporado = 'Incorporado',
    Inativo = 'Inativo'
}