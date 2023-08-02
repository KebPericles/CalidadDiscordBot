import './config';
import { DiscordCommand, DiscordEvent } from '@src/types';

import {
	Client,
	Collection,
	GatewayIntentBits,
	RESTPostAPIChatInputApplicationCommandsJSONBody as CommandsJSONBody,
	Routes,
	EmbedBuilder
} from 'discord.js';

import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';

const { BOT_TOKEN, GUILD_ID, CLIENT_ID, ENV } = process.env;

if (typeof BOT_TOKEN === 'undefined') {
	throw new Error('The bot token cannot be undefined');
}

if (typeof CLIENT_ID === 'undefined') {
	throw new Error('The client id cannot be undefined');
}

if (typeof GUILD_ID === 'undefined') {
	throw new Error('The guild id cannot be undefined');
}

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences
	]
});

defaultEmbed = () => new EmbedBuilder()
	.setColor(0x0099ff)
	.setAuthor({
		name: "Manchas Cyberpunk",
		iconURL:
			"https://cdn.discordapp.com/emojis/771974836322959360.webp",
	})
	.setThumbnail(client.user?.avatarURL() || null)
	.setFooter({
		text: "Bot hecho con calidad por Pan con Queso",
		iconURL:
			"https://cdn.discordapp.com/emojis/1001666667828486234.webp",
	});

// ====================== Update the bot commands commands ====================== //
const COMMANDS_DIR = 'src/commands'

commands = new Collection<string, DiscordCommand>();
let commandArray: Array<CommandsJSONBody> = [];

const commandFolders = readdirSync(`./${COMMANDS_DIR}`);
for (const folder of commandFolders) {
	if (folder === 'dev' && ENV !== 'dev') {
		continue;
	}

	const commandFiles = readdirSync(`./${COMMANDS_DIR}/${folder}`)
		.filter((file) => file.endsWith('.ts'));

	for (const file of commandFiles) {
		const command: DiscordCommand = require(`@root/${COMMANDS_DIR}/${folder}/${file}`);

		commands.set(command.data.name, command);
		commandArray.push(command.data.toJSON());
		console.log(`Command ${command.data.name} has been passed through the handler`);
	}
}

const registerComands = async (commandArray: Array<CommandsJSONBody>) => {
	// Login to discord API
	const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
	try {
		console.log('Refreshing (/) commands');

		// Load the commands to Discord Guild
		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
			body: commandArray
		});

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.log(error);
	}
}

registerComands(commandArray);

// ====================== Update the bot commands events ====================== //
const EVENTS_DIR = 'src/events';

const eventsFolder = readdirSync(`./${EVENTS_DIR}`);
for (const folder of eventsFolder) {
	if (folder === 'dev' && ENV !== 'dev') {
		continue;
	}

	const eventFiles = readdirSync(`./${EVENTS_DIR}/${folder}`)
	for (const file of eventFiles) {
		const event: DiscordEvent = require(`@root/${EVENTS_DIR}/${folder}/${file}`);

		if (event.once)
			client.once(event.name, async (...args) => event.execute(...args, client));
		else
			client.on(event.name, (...args) => event.execute(...args, client));

		console.log(`Event ${event.name} has been passed through the handler`);
	}
}

client.login(BOT_TOKEN);

export default client;