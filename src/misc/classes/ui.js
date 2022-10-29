const { CommandInteraction, Client, Message, InteractionCollector, ButtonInteraction, MessageComponentInteraction, EmbedBuilder, ComponentType, BaseInteraction } = require("discord.js");
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
        this.ephemeral = ui.ephemeral;
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    sendInterface = async (interaction) => {
        let embeds = [];
        this.embeds.forEach(async embed => embeds.push(await embed(interaction)));

        let comps = [];
        this.components.forEach(async component => comps.push((await component).getComponent()));

        await interaction.editReply({
            embeds: embeds,
            components: comps,
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

        this.collectorsToCreate.forEach(async collector => {
            collectors.push((await interaction.fetchReply()).createMessageComponentCollector({
                componentType: collector.componentType,
                time: collector.time
            }));
        });

        // Search components for each collector
        collectors.forEach(async collector => {
            /**
             * @type {Array<DiscordComponent>}
             */
            let comps = [];

            // We search the components that are action rows
            let actionRowComps = this.components.filter(async component => {
                let c = await component;
                if (c.componentType === ComponentType.ActionRow) return c.componentType === collector.componentType;
            });

            // We search in the components of the ActionRow and include them in the array if they meet the condition
            actionRowComps.forEach(rowComp => {
                comps.push(rowComp.childComponents.filter(childComp => {
                    return childComp.componentType === collector.componentType;
                }))
            });

            // We add the components that are isolated
            comps.push(this.components.filter(async component => (await component).componentType === collector.componentType));

            // Then we add the components to the collector
            collector.on("collect", collectInt => comps.find((comp) => comp.id === collectInt.customId).collect(interaction));
            collector.on("ignore", collectInt => comps.find((comp) => comp.id === collectInt.customId).ignore(interaction));
            collector.on("dispose", collectInt => comps.find((comp) => comp.id === collectInt.customId).dispose(interaction));
        });

    }

    /**
     * @type {Array<(interaction:BaseInteraction)=>EmbedBuilder>}
     */
    embeds;
    /**
     * @type {Array<Promise<DiscordComponent>>}
     */
    components;
    /**
     * @type { Array<DiscordCollector>}
     */
    collectorsToCreate;
    /**
     * @type {Boolean}
     */
    ephemeral = false;
}