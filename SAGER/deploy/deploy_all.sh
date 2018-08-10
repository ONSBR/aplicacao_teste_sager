#!/bin/bash
echo 'Deploy Domain'
cd ../domain-app/sagerdomain.app/
plataforma --deploy local

echo 'Deploy Presentation'
cd ../../presentation-app/portal/
npm install
plataforma --deploy local

cd ../consultarhistoricotaxaspresentation.app/
cd server
npm uninstall
npm install
cd ../consultar-historico-taxas-web
npm uninstall
cd ..
./run.sh

node server/spec/script/load_data_test.js

cd ../mantercenariopresentation.app/
cd server
npm uninstall
npm install
cd ../manter-cenario-web
npm uninstall
cd ..
./run.sh

cd ../mantertarefasretificacaopresentation.app/
cd server
npm uninstall
npm install
cd ../mantertarefasretificacao-web
npm uninstall
cd ..
./run.sh

echo 'Deploy Process'
cd ../../process-app/abrircenarioprocess/
npm uninstall
npm install
plataforma --deploy local

cd ../executarcalculotaxas/
npm uninstall
npm install
plataforma --deploy local

cd ../calculartaxasprocess/
npm uninstall
npm install
plataforma --deploy local

node spec/_script/load_data_test.js

docker start maestro-sager-domain
