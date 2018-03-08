export class Cenario {
    
    public id: string;
    public nomeCenario: string;
    public dataInicioVigencia: Date;
    public dataFimVigencia: Date;
    public justificativa: string;
    public idUsina: string;
    public situacao: SituacaoCenario;

    public regras: RegraCritica[] = [];

    constructor() {
    }
}

export class RegraCritica {

    id: string;
    nomeRegra: string;
    regraDe: string;
    regraPara: string;
    tipoRegra: TipoRegra;

}

export class UnidadeGeradora {

    idUge: string;
    idUsina: string;
    potenciaDisponivel: number;
    
}

export class Usina {

    id: string;
    idUsina: string;
    nome: string;
}

export enum TipoRegra {
    PotenciaDisponivel = 'Potência Disponível',
    Franquia = 'Franquia',
    OrigemEvento = 'Origem do Evento'
}

export enum SituacaoCenario {
    Ativo = 'Ativo',
    Incorporado = 'Incorporado',
    Inativo = 'Inativo'
}

