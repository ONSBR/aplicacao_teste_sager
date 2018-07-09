#!/bin/bash
echo 'Iniciando build da aplicação web'
npm i aprovar-reprocessamento-web/
cd aprovar-reprocessamento-web/
ng build
echo 'Build da aplicação web finalizado'
echo 'Cópia da dist web'
cp dist/* ../server/dist/
echo 'Cópia finalizada'
cd ..
echo 'Iniciando deploy da app'
plataforma --deploy local



