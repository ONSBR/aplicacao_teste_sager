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
    FranquiaGICHorasLimite = 'Valor de horas limite para utilização da franquia GIC(desde 01/01/2001).',
    FranquiaGICTempoLimiteAntes102014 = 'Tempo Limite em horas para utilização da franquia GIC (antes 10/2014).',
    FranquiaGICTempoLimiteApos102014 = 'Tempo Limite em meses para utilização da franquia GIC (após 10/2014).',
    FranquiaGMTHorasLimiteAntes01102014 = 'Valor de horas limite para utilização da franquia GMT (antes 01/10/2014).',
    FranquiaGMTHorasLimiteAPartir01102014 = 'Valor de horas limite para utilização da franquia GMT (a partir 01/10/2014)',
    FranquiaGIMRestricaoTempo = 'Restrição de tempo para iniciar a utilização da franquia GIM: Regra Válida após 01/10/14.',
    FranquiaGIMTempoLimiteAntes01102014 = 'Tempo limite para utilização da  franquia GIM(antes de 01/10/2014).',
    FranquiaGIMTempoLimiteApos01102014 = 'Tempo limite para utilização da  franquia GIM(apos 01/10/2014).',
    OrigemEvento = 'Classificação de Origem do Evento',
    EstadoOperativo = 'Estado Operativo do Evento',
    CondicaoOperativo = 'Condição Operativa do Evento',
}

export enum SituacaoCenario {
    Ativo = 'Ativo',
    Incorporado = 'Incorporado',
    Inativo = 'Inativo'
}

