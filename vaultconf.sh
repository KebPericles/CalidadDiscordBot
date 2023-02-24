#!/bin/sh

SECRET_KEY="$(cat /run/secrets/vault_key>&1)"
echo "SECRET READEN SUCCESFULLY"
npx dotenv-vault decrypt $SECRET_KEY > .env
echo ".ENV CREATED SUCCESSFULLY"
