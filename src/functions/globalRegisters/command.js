const fs = require('fs');
const { Routes, Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const DiscordCommand = require('../../misc/classes/commands');
const { BOT_TOKEN, GUILD_ID, CLIENT_ID } = process.env;
const COMMANDS_DIR = 'src/commands'

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
	/**
	 * @type {Promise}
	 */
	client.registerCommands = async () => {
		const commandFolders = fs.readdirSync(`./${COMMANDS_DIR}`);
		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`./${COMMANDS_DIR}/${folder}`)
				.filter((file) => file.endsWith('.js'));

			const { commands, commandArray } = client;
			for (const file of commandFiles) {
				/**
				 * @type {DiscordCommand}
				 */
				const command = require(`@root/${COMMANDS_DIR}/${folder}/${file}`);

				if ('data' in command && 'execute' in command) {
					commands.set(command.data.name, command);
					commandArray.push(command.data.toJSON());
					console.log(`Command ${command.data.name} has been passed through the handler`);
				} else {
					console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
				}
			}
		}

		// Login to discord API
		const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
		try {
			console.log('Refreshing (/) commands');

			// Load the commands to Discord Guild
			await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
				body: client.commandArray
			});

			console.log('Successfully registered application commands.');
		} catch (error) {
			console.log(error);
		}
	};

	client.registerCommands();
	delete client.commandArray;
}