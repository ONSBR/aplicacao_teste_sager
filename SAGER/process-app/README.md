# Engine de execução de processos da plataforma. chamada do worker.



###############################################################################################
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
