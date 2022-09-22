const { SlashCommandBuilder } = require("discord.js")

module.exports = class DiscordCommand {
    /**
     * @type {SlashCommandBuilder}
     */
    data;
    /**
     * @type {Promise}
     */
    execute;
}