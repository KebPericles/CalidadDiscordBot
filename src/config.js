require('dotenv').config('../.env');
console.log(process.env);
const mod_alias = require('module-alias');

mod_alias.addAlias('@root', __dirname + '/../');
mod_alias.addAlias('@src', __dirname);