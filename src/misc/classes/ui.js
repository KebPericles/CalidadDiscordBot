const { CommandInteraction, Client, Message, InteractionCollector, ButtonInteraction, MessageComponentInteraction } = require("discord.js");
const DiscordCollector = require("./collector");
const DiscordComponent = require("./component");

module.exports = class DiscordUserInterface {
    /**
     * 
     * @param {DiscordUserInterface} ui 
     */
    constructor(ui) {
        this.components = ui.components;
        this.embeds = ui.embeds;
        this.collectorsToCreate = this.collectorsToCreate;
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    sendInterface = async (interaction) => {
        await interaction.editReply({
            embeds: this.embeds,
            components: this.components,
            ephemeral: this.ephemeral
        });
    };

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    createCollectors = async (interaction) => {
        /**
         * @type {Array<InteractionCollector>}
         */
        let collectors = [];
        /**
         * @type {Array<DiscordComponent>}
         */
        let comps = [];

        this.collectorsToCreate.forEach(async collector => {
            collectors.push((await interaction.fetchReply()).createMessageComponentCollector({
                componentType: collector.componentType,
                time: collector.time
            }));
        });

        collectors.forEach(async collector => {
            comps = this.components.filter(component => component.componentType === collector.componentType);

            collector.on("collect", collectInt => comps.find((comp) => comp.id === collectInt.customId).collect(interaction));
            collector.on("ignore", collectInt => comps.find((comp) => comp.id === collectInt.customId).ignore(interaction));
            collector.on("dispose", collectInt => comps.find((comp) => comp.id === collectInt.customId).dispose(interaction));
        });

    }

    embeds;
    /**
     * @type {Array<DiscordComponent>}
     */
    components;
    /**
     * @type { Array<DiscordCollector>}
     */
    collectorsToCreate;
    /**
     * @type {Boolean}
     */
    ephemeral=false;
}