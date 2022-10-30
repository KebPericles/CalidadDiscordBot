const { ButtonInteraction, Awaitable, ComponentType, ComponentBuilder, ActionRowBuilder, CommandInteraction } = require("discord.js");

module.exports = class DiscordComponent {
    /**
     * 
     * @param {DiscordComponent} dc 
     */
    constructor({ component, childComponents, collect, componentType, dispose, id, ignore, isRowComponent = false }) {
        this.component = component;
        this.childComponents = childComponents;
        this.collect = collect;
        this.componentType = componentType;
        this.dispose = dispose;
        this.id = id;
        this.ignore = ignore;
        this.isRowComponent = isRowComponent;
    }

    getComponent = () => {
        if (!this.isRowComponent) return this.component;

        /**
         * @type {ActionRowBuilder}
         */
        let row = this.component;
        let childComps = [];
        this.childComponents.forEach(childComp => childComps.push(childComp.getComponent()));
        row.addComponents(childComps);
        return row;
    }
    /**
     * Indicates if it is an ActionRow, 
     * @type {Boolean}
     */
    isRowComponent = false;
    /**
     * @type {ComponentBuilder}
     */
    component;
    /**
     * @type {Array<DiscordComponent>}
     */
    childComponents;
    /**
     * @type {String}
     */
    id = "";
    /**
     * @type {ComponentType}
     */
    componentType;
    /**
     * @type {(interaction: ButtonInteraction, commandInteraction: CommandInteraction)=> Awaitable<void>}
     */
    dispose = () => { };
    /**
     * @type {(interaction: ButtonInteraction, commandInteraction: CommandInteraction)=> Awaitable<void>}
     */
    collect = () => { };
    /**
     * @type {(interaction: ButtonInteraction, commandInteraction: CommandInteraction)=> Awaitable<void>}
     */
    ignore = () => { };
}