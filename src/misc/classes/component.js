const { ButtonInteraction,Awaitable } = require("discord.js");

module.exports = class DiscordComponent{
    id;
    /**
     * @type {(interaction: ButtonInteraction)=> Awaitable<void>}
     */
    dispose;
    collect;
    ignore;
}