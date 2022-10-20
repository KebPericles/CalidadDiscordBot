const { CommandInteraction } = require("discord.js");
const DiscordUserInterface = require("./ui");

module.exports = class UserInterface {
    /**
     * 
     * @param {DiscordUserInterface} ui 
     * @param {CommandInteraction} interaction 
     */
    constructor (ui,interaction){
        ui.sendInterface(interaction);
        ui.createCollectors(interaction);
    }
}