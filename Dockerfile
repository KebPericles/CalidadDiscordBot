FROM node:18

RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . ./

CMD ["npm", "start"]