#!/bin/bash
echo 'Iniciando build da aplicação web'
npm i mantertarefasretificacao-web/
cd mantertarefasretificacao-web/
ng build
echo 'Build da aplicação web finalizado'
echo 'Cópia da dist web'
cp dist/* ../server/dist/
echo 'Cópia finalizada'
cd ..
echo 'Iniciando deploy da app'
plataforma --deploy local



