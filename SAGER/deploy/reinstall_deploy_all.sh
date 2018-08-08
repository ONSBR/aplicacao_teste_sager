#!/bin/bash
echo 'Uninstall Plataforma'
plataforma --uninstall

docker stop $(docker ps -a -q)

docker rm $(docker ps -a -q)

docker rmi $(docker images -a -q)

echo 'Install Plataforma'
plataforma --install
