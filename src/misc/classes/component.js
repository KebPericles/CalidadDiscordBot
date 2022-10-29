const { ButtonInteraction, Awaitable, ComponentType, ComponentBuilder, ActionRowBuilder } = require("discord.js");

module.exports = class DiscordComponent {
    /**
     * 
     * @param {DiscordComponent} dc 
     */
    constructor(dc){
        this.component = dc.component;
        this.childComponents = dc.childComponents;
        this.collect = dc.collect;
        this.componentType = dc.componentType;
        this.dispose = dc.dispose;
        this.id = dc.id;
        this.ignore = dc.ignore;
        this.isRowComponent = dc.isRowComponent;
    }
    getComponent = () => {
        if(!this.isRowComponent) return this.component;

        /**
         * @type {ActionRowBuilder}
         */
        let row = this.component;
        this.childComponents.forEach(childComp => row.addComponents(childComp.component));
    }
    /**
     * Indicates if it is an ActionRow, 
     * @type {Boolean}
     */
    isRowComponent=false;
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
    id="";
    /**
     * @type {ComponentType}
     */
    componentType;
    /**
     * @type {(interaction: ButtonInteraction)=> Awaitable<void>}
     */
    dispose=()=>{};
    /**
     * @type {(interaction: ButtonInteraction)=> Awaitable<void>}
     */
    collect=()=>{};
    /**
     * @type {(interaction: ButtonInteraction)=> Awaitable<void>}
     */
    ignore=()=>{};
}