FROM node:18

RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install --omit=dev

COPY --chown=node:node . ./

COPY --chown=node:node --chmod=777 ./vaultconf.sh ./

RUN npm install dotenv-vault

RUN --mount=type=secret,id=vault_key,required=true,uid=1000 ./vaultconf.sh

CMD ["npm", "start"]
