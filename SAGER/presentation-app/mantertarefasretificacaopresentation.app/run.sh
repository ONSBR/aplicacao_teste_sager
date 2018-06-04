#!/bin/bash
echo 'Iniciando build da aplicação web'
cd mantertarefasretificacao-web/
npm install
ng build
echo 'Build da aplicação web finalizado'
echo 'Cópia da dist web'
cp dist/* ../server/dist/
echo 'Cópia finalizada'
echo 'build da aplicacação backend'
cd ../server/
npm install
echo 'build da aplicacação backend finalizado'
cd ..
echo 'Iniciando deploy da app'
plataforma --deploy local



