#!/bin/bash
echo 'Deploy Domain'
cd ../domain-app/sagerdomain.app/
plataforma --deploy local

echo 'Deploy Presentation'
cd ../../presentation-app/portal/
plataforma --deploy local

cd ../consultarhistoricotaxaspresentation.app/
cd server
rm -r -f node_modules
npm install
cd ../consultar-historico-taxas-web
rm -r -f node_modules
cd ..
./run.sh

node server/spec/script/load_data_test.js

cd ../mantercenariopresentation.app/
cd server
rm -r -f node_modules
npm install
cd ../manter-cenario-web
rm -r -f node_modules
cd ..
./run.sh

cd ../mantertarefasretificacaopresentation.app/
cd server
rm -r -f node_modules
npm install
cd ../mantertarefasretificacao-web
rm -r -f node_modules
cd ..
./run.sh

echo 'Deploy Process'
cd ../../process-app/abrircenarioprocess/
plataforma --deploy local

cd ../executartaxasprocess/
plataforma --deploy local

cd ../calculartaxasprocess/
plataforma --deploy local

node spec/_script/load_data_test.js


