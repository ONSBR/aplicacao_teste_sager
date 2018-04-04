
FROM node:carbon
WORKDIR /usr/src/mantertarefasretificacaopresentation.app
COPY . .
ENV PORT 8088
CMD [ "node", "--inspect-brk=0.0.0.0", "server/app.js" ]
