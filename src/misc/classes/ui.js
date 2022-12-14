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
        this.collectorsToCreate = ui.collectorsToCreate;
        this.ephemeral = ui.ephemeral;
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    sendInterface = async (interaction) => {
        let embeds = [];
        for (const embed of this.embeds) {
            embeds.push(await embed(interaction));
        }

        let comps = [];
        for (const component of this.components) {
            comps.push((await component()).getComponent())
        }

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

        for (const collector of this.collectorsToCreate) {
            collectors.push((await interaction.fetchReply()).createMessageComponentCollector({
                componentType: collector.componentType,
                time: collector.time
            }));
        }

        // Search components for each collector
        collectors.forEach(async collector => {
            /**
             * @type {Array<DiscordComponent>}
             */
            let comps = [];

            // We search the components that are action rows
            let actionRowComps = this.components.filter(async component => {
                /**
                 * @type {DiscordComponent}
                 */
                let c = await component();
                if (c.componentType === ComponentType.ActionRow) return c.componentType === collector.componentType;
            });

            // We search in the components of the ActionRow and include them in the array if they meet the condition
            actionRowComps.forEach(async rowComp => {
                (await rowComp()).childComponents.filter(childComp => {
                    return childComp.componentType === collector.componentType;
                }).forEach(comp => comps.push(comp));
            });

            // We add the components that are isolated
            for (const comp of this.components.filter(async component => (await component).componentType === collector.componentType)) {
                comps.push(await comp());
            }

            // Then we add the components to the collector
            collector.on("collect", async collectInt => await (comps.find(async (comp) => comp.id === collectInt.customId).collect)(collectInt, interaction));
            collector.on("ignore", async collectInt => await ((comps.find(async (comp) => comp.id === collectInt.customId)).ignore)(collectInt, interaction));
            collector.on("dispose", async collectInt => await ((comps.find(async (comp) => comp.id === collectInt.customId)).dispose)(collectInt, interaction));
        });

    }

    /**
     * @type {Array<Promise<EmbedBuilder>>}
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