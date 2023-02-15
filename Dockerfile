FROM node:18

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install --production=false

RUN npx dotenv-vault pull production

CMD ["npm", "run", "dev"]