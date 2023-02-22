FROM node:18

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --only=dev

COPY * ./

RUN npx dotenv-vault pull production

CMD ["npm", "run", "dev"]