#############################################################################################################################
#
# ESTRUTURA DE PASTAS 
#
# O process.app está estruturado da seguinte forma:
# - mapa\: arquivos de mapeamento de entidades do projeto
# - metadados\: arquivos de mapeamento de eventos
# - process\: pasta de arquivos de processamento de negócio
# - process\business\: pasta com as classes de negocio
# - process\entities\: pasta com as entidades de negócio utilizadas no cálculo
#
# classes de teste:
# - spec\executarcalculotaxasSpec.js : testa as regras de requisição de cálculo de taxasevento que atende cada tipo
#   de parâmetros
#############################################################################################################################

# para executar os testes unitários utilize o jasmine
jasmine

# para executar a análise de cobertura dos testes, utilizar o istanbul:
npm test

#############################################################################################################################
#
# DEPLOY E EXECUÇÃO
#
# O processapp de executarcalculotaxa que incia o cálculo propriamente dito, pois dispara a execução dos cálculos
# para todas as usinas
#
#############################################################################################################################

# Para iniciar execução desse processapp deve ser feita instalação das dependências com:
npm install

# Para executar o processapp a partir da plataforma deve ser feito deploy:
plataforma --deploy local

# Para executar o cálculo de fechamento para um específico mês/ano.
# Deve enviar uma mensagem de evento para o event-manager da plataforma.
Http Method: PUT
{
	"name": "calculate.tax.request",
	"payload": {
		"mesFechamento":12,
		"anoFechamento":2014
	}
}

