require('module-alias/register')
require('dotenv').config();

const MemeTemplate = require('./misc/classes/memeTemplate.js');
const SelectMenuOption = require('./misc/classes/SelectMenuOption.js');

const { BOT_TOKEN } = process.env;
const FUNCTIONS_DIR = 'src/functions';

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const TEMPLATES_URL = 'https://api.memegen.link/templates/';
const SETTINGS = {method: 'Get'};

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

fetch(TEMPLATES_URL, SETTINGS)
	.then(res => res.json())
	.then(json => {
		client.memeTemplates = json;
		
		let selectorOptions = [];

		for (let i = 0; i < json.length; i++) {
			/**
			 * @type {MemeTemplate}
			 */
			const tmp = json[i];

			let option = new SelectMenuOption(tmp.name, String(i));

			selectorOptions.push(option);
		}

		client.memeSelectorOptions = selectorOptions;
	});

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