export const ClassificacaoOrigem = {

    // responsabilidade
    GUM : 'GUM',    // turbina e equipamentos associados à produção de potência mecânica
    GGE : 'GGE',    // gerador e equipamentos associados à produção de potência elétrica
    GTR : 'GTR',    // transformador elevador de tensão e equipamentos associados
    GOT : 'GOT',    // equipamentos ou sistemas eletromecânicos associados aos serviços auxiliares
    GAC : 'GAC',    // restrição elétrica imposta por ativos de conexão de uso exclusivo do empreendimento de geração
    GAG : 'GAG',    // origens não caracterizadas por equipamentos ou sistemas eletromecânicos
    GCB : 'GCB',    // restrições em unidades geradoras termelétricas associadas ao fornecimento do combustível

    // não responsabilidade sem taxas
    GCI : 'GCI',    // restrições em unidades geradoras termelétricas associadas ao fornecimento do combustível
    GIS : 'GIS',    // instalação de sistemas por determinação do ons
    GIC : 'GIC',    // indisponibilidades associadas ao início de operação comercial de unidade geradora
    GIM : 'GIM',    // indisponibilidades associadas à modernização ou reforma que traga ganhos operativos ao sistema elétrico
    GVO : 'GVO',    // indisponibilidades atípicas associadas ao início de operação comercial de unidade geradora
    GMP : 'GMP',    // indisponibilidades associadas a medidas de caráter preventivo de combate à proliferação
    GMT : 'GMT',    // indisponibilidades associadas às intervenções de limpeza.

    // não responsabilidade
    GHN : 'GHN',    // restrição devido à navegação que não caracterize responsabilidade do agente
    GHT : 'GHT',    // restrição devido ao turismo que não caracterize responsabilidade do agente
    GHI : 'GHI',    // restrição devido à irrigação ou outras captações que não caracterize responsabilidade do agente
    GHC : 'GHC',    // restrição devido ao controle de cheia e a inundações que não caracterize responsabilidade do agente
    GRE : 'GRE',    // restrição de potência por redução de queda útil
    GRB : 'GRB',    // restrição elétrica imposta pela rede básica
    GOU : 'GOU',    // restrição elétrica imposta por outros sistemas de transmissão ou pelo sistema de distribuição
    GOO : 'GOO',    // restrição por outras origens que não caracterize responsabilidade do empreendimento de geração
    GHM: 'GHM'     // restrição devido ao meio ambiente
}

export const CondicaoOperativa = {
    NOR : 'NOR', // ligada ou desligada em consições normais
    RPR : 'RPR', // ligada ou desligada sob restrição que afeta sua produção, por causa programada
    RFO : 'RFO', // ligada ou desligada sob restrição que afeta sua produção, por causa forçada
    NOT : 'NOT', // ligada em consições normais, pra comprovação 
    TST : 'TST'  // aguardando comprovação
}

export const EstadoOperativo = {
    LIG : 'LIG', // ligado
    LCS : 'LCS', // ligado como compensador pelo ONS
    LCC : 'LCC', // ligado como compensador pelo Agente
    LCI : 'LCI', // ligado como compensador pelo ONS, pra manutenção de inércia mínima
    RDP : 'RDP', // operação caracterizada pela partida de uma Unidade Geradora Termelétrica que se encontra em Reserva de Prontidão
    DEM : 'DEM', // desligado em emergência
    DUR : 'DUR', // desligado em urgência
    DAU : 'DAU', // Desligado automaticamente por atuação de sistema de proteção ou de controle.
    DCO : 'DCO', // desligado por conveniência operativa do ONS
    DPR : 'DPR', // desligado para manutenção programada de acordo aos prazos dos procedimentos de Rede do ONS
    DPA : 'DPA', // desligado para ampliações, reforços e melhorias
    DAP : 'DAP', // desligamento em aproveitamento para intervenção programada
    DCA : 'DCA', // desligado por necessidade do Agente
    EOC : 'EOC', // entrada em operação comercial
    DES : 'DES'  // desativado
}