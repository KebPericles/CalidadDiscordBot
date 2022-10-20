const { CommandInteraction, Client } = require("discord.js");

module.exports = class DiscordUserInterface {
    embeds;
    /**
     * @type {Array<DiscordComponent>}
     */
    components;
    /**
     * @type { Array<DiscordCollector>}
     */
    collectorsToCreate;
}