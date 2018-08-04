export class Cenario {
    public idCenario: string;
    public nomeCenario: string;
    public dataInicioVigencia: Date;
    public dataFimVigencia: Date;
    public justificativa: string;
    public idUsina: string;
    public usina: Usina;
    public situacao: SituacaoCenario;

    public regras: RegraCritica[] = [];

    constructor() {
    }
}
export class RegraCritica {
    id: string;
    idCenario: string;
    nomeRegra: string;
    regraDe: string;
    regraPara: string;
    tipoRegra: TipoRegra;
    dataInicioVigencia: Date;
    dataFimVigencia: Date;
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
    franquia: string;
}

export enum TipoRegra {
    PotenciaDisponivel = 'Potência Disponível',
    OrigemEvento = 'Classificação de Origem do Evento',
    EstadoOperativo = 'Estado Operativo do Evento',
    CondicaoOperativo = 'Condição Operativa do Evento',
}

export enum SituacaoCenario {
    Ativo = 'Ativo',
    Incorporado = 'Incorporado',
    Inativo = 'Inativo'
}

