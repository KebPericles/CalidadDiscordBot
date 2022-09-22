const { Event } = require('@root/src/misc/classes/event.js');
const DiscordEvent = require('../../misc/classes/event');
/**
 * @type {DiscordEvent}
 */
module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     * @returns 
     */
    async execute(client) {
        console.log(`Ready!! ${client.user.tag} is logged in and online.`);
    }
}