const { Client } = require('discord.js');
const fs = require('fs');
const DiscordEvent = require('../../misc/classes/event');
const UIS_DIR = 'src/ui';

/**
 * @param {Client} client
 */
module.exports = (client) => {
	client.registerUis = async () => {
		const uisFolder = fs.readdirSync(`./${UIS_DIR}`);
		for (const folder of uisFolder) {
			const uisFiles = fs.readdirSync(`./${UIS_DIR}/${folder}`)

			for (const file of uisFiles) {
				/**
				 * @type { DiscordEvent}
				 */
				let uiName = file.replace(".js$","");
				client.myCustomUis[uiName] = require(`@root/${UIS_DIR}/${folder}/${file}`);
			}
		}
	};
	client.registerUis();
}