
FROM node:carbon
WORKDIR /usr/src/mantercenariopresentation.app
COPY . .
ENV PORT 8088
CMD [ "node", "--inspect=0.0.0.0", "server/app.js" ]