FROM node:carbon
WORKDIR /usr/src/
COPY . .
WORKDIR /usr/src/server/
ENV PORT 8088
EXPOSE $PORT
ENTRYPOINT [ "node", "--inspect=0.0.0.0", "./portal.js" ]
            