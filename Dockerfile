FROM node:alpine

COPY package*.json .

COPY  yarn.lock .

RUN yarn install

COPY . .

RUN chmod 755 entrypoint.sh

EXPOSE  6000

CMD  [ "/bin/sh", "entrypoint.sh" ]
