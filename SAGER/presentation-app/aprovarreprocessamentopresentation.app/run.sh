#!/bin/bash
echo 'Iniciando build da aplicação web'
npm i aprovar-reprocessamento-web/
cd aprovar-reprocessamento-web/
ng build
echo 'Build da aplicação web finalizado'
echo 'Cópia da dist web'
cp -rf dist/aprovar-reprocessamento-web/* ../server/dist/
echo 'Cópia finalizada'
cd ..
echo 'Iniciando deploy da app'
plataforma --deploy local



