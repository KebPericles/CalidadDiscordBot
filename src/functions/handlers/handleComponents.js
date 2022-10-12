const { Client } = require('discord.js');
const fs = require('fs');
const DiscordEvent = require('../../misc/classes/event');
const COMPONENTS_DIR = 'src/events';

/**
 * @param {Client} client
 */
module.exports = (client) => {
	client.handleComponents = async () => {
		const componentsFolder = fs.readdirSync(`./${COMPONENTS_DIR}`);
		for (const folder of componentsFolder) {
			const componentFiles = fs.readdirSync(`./${COMPONENTS_DIR}/${folder}`)

			for (const file of componentFiles) {
				/**
				 * @type { DiscordEvent}
				 */
				client.myCustomComponents.push(require(`@root/${COMPONENTS_DIR}/${folder}/${file}`));
			}

		}
	}
}