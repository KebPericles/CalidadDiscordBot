#!/bin/sh
SECRET_KEY="$(cat /run/secrets/vault_key>&1)"
npx dotenv-vault decrypt $SECRET_KEY > .env