FROM node:carbon
WORKDIR /usr/src/consultarhistoricotaxaspresentation.app
COPY server server
COPY mapa mapa
COPY metadados metadados
ENV PORT 8088
CMD [ "node", "--inspect=0.0.0.0", "server/app.js" ]