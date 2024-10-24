FROM node:21

COPY . /app 

WORKDIR /app

EXPOSE 3002

RUN npm install -g npm@10.9.0

RUN npm install

CMD ["node", "server.js"]