require('module-alias/register')
require('dotenv').config("../.env.production");

const { BOT_TOKEN } = process.env;
const FUNCTIONS_DIR = 'src/functions';
const GLOBAL_DIR = 'globalRegisters';

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { builtinModules } = require('module');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences
	]
});

client.commands = new Collection();
client.commandArray = [];
client.createdChannels = [];
client.myCustomUis = {};

const functionFolders = fs.readdirSync(`./${FUNCTIONS_DIR}`);
for (const folder of functionFolders) {
	if (folder == GLOBAL_DIR) {
		const functionFiles = fs
		.readdirSync(`./${FUNCTIONS_DIR}/${folder}`)
		//.filter((file) => file.endsWith('.register.js'))
		for (const file of functionFiles) {
			require(`@root/${FUNCTIONS_DIR}/${folder}/${file}`)(client);	
		}
	} else {
		require(`@root/${FUNCTIONS_DIR}/${folder}/${folder}.js`)(client);
	}
}

client.login(BOT_TOKEN);

module.exports.client = client;