
FROM node:carbon
WORKDIR /usr/src/mantercenariopresentation.app
COPY server server
COPY mapa mapa
COPY metadados metadados
ENV PORT 8088
EXPOSE $PORT
CMD [ "node", "--inspect=0.0.0.0", "server/app.js" ]
