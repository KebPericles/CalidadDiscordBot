const { doesNotReject } = require('assert');
const { Client } = require('discord.js');
const fs = require('fs');
const DiscordEvent = require('../../misc/classes/event');
const EVENTS_DIR = 'src/events';

/**
 * @param {Client} client
 */
module.exports = (client) => {
    client.handleEvents = async () => {
        const eventsFolder = fs.readdirSync(`./${EVENTS_DIR}`);
        for (const folder of eventsFolder) {
            const eventFiles = fs.readdirSync(`./${EVENTS_DIR}/${folder}`)
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        /**
                         * @type { DiscordEvent}
                         */
                        const event = require(`@root/${EVENTS_DIR}/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client))
                    }
                    break;
                default:
                    break;
            }
        }
    }
}