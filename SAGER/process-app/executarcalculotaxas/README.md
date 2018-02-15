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

# Para executar o cálculo de fechamento para um específico mês/ano.
# Deve enviar uma mensagem de evento para o event-manager da plataforma.
{
	"name": "calculate.tax.request",
	"payload": {
		"mesFechamento":12,
		"anoFechamento":2014
	}
}

