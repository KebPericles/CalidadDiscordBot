FROM node:18

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY * ./

RUN npx dotenv-vault login

RUN npx dotenv-vault pull production

CMD ["npm", "start"]

USER node
