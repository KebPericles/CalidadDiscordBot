require('dotenv-vault-core').config();
const mod_alias = require('module-alias');

mod_alias.addAlias('@root', __dirname + '/../');
mod_alias.addAlias('@src', __dirname);