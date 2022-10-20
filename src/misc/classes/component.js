const { ButtonInteraction,Awaitable, ComponentType } = require("discord.js");

module.exports = class DiscordComponent{
    /**
     * @type {String}
     */
    id;
    /**
     * @type {ComponentType}
     */
    componentType;
    /**
     * @type {(interaction: ButtonInteraction)=> Awaitable<void>}
     */
    dispose;
    /**
     * @type {(interaction: ButtonInteraction)=> Awaitable<void>}
     */
    collect;
    /**
     * @type {(interaction: ButtonInteraction)=> Awaitable<void>}
     */
    ignore;
}