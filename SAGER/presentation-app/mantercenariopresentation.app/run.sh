#!/bin/bash
echo 'Iniciando build da aplicação web'
cd manter-cenario-web/
npm install
ng build
echo 'Build da aplicação web finalizado'
echo 'Cópia da dist web'
cp -rf dist/* ../server/dist/
echo 'Cópia finalizada'
cd ..
echo 'Iniciando deploy da app'
plataforma --deploy local



