FROM node:21

WORKDIR /app

COPY package*.json .

EXPOSE 3002

RUN npm install -g npm@10.9.0

RUN npm install -g nodemon

RUN npm install

COPY . . 

CMD ["nodemon", "server.js"]
