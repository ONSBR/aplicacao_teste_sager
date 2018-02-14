# Engine de execução de processos da plataforma. chamada do worker.

#############################################################################################################################
#
# ESTRUTURA DE PASTAS 
#
# O process.app está estruturado da seguinte forma:
# - mapa\: arquivos de mapeamento de entidades do projeto
# - metadados\: arquivos de mapeamento de eventos
# - process\: pasta de arquivos de processamento de negócio
# - process\business\: pasta com as classes de negocio
# - process\business\parametros\: pasta com as classes de negocio de calculo de parametros
# - process\entities\: pasta com as entidades de negócio utilizadas no cálculo
#
# classes de teste:
# - spec\testmass\: pasta com arquivos e conteúdo para carga de massa de testes,temos massa de 
#   teste em planilha e estáticas
# - spec\calcularparametrostaxas.appSpec.js : testa o cálculo dos parâmetros
# - spec\calculartaxasprocess.appSpec.js : testa o cálculo das taxas
# - spec\validaeventotipoparametro.appSpec.js : testa as regras de evento que atende cada tipo
#   de parâmetros
#############################################################################################################################


#############################################################################################################################
#
# TESTES 
#
# Para fazer carga de dados na base de domínio para teste 
# use o script a seguir. Será feita carga com os dados que estão
# em ./spec/testmass/filemass
# é necessário configurar a nesse script da porta de domínio
# em DOMAIN_PORT e o mapa a ser usado em MAPA
###############################################################################################

# carga de dados de testes na base de dados utilizar o load_data_test
node ./spec/_script/load_data_test.js

# Para executar o cálculo de fechamento para um específico mês/ano.
# Deve enviar uma mensagem de evento para o event-manager da plataforma.
#{
#	"name": "calculate.tax.request",
#	"payload": {
#		"mesFechamento":12,
#		"anoFechamento":2014
#	}
#}

