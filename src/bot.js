require('module-alias/register')
require('dotenv').config();

const { BOT_TOKEN } = process.env;
const FUNCTIONS_DIR = 'src/functions';

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

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

const functionFolders = fs.readdirSync(`./${FUNCTIONS_DIR}`);
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./${FUNCTIONS_DIR}/${folder}`)
		.filter((file) => file.endsWith('.js'))
	for (const file of functionFiles)
		require(`@root/${FUNCTIONS_DIR}/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(BOT_TOKEN);