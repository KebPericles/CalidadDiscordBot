const { ComponentType } = require("discord.js");

module.exports = class DiscordCollector {
    /**
     * 
     * @param {ComponentType} componentType 
     * @param {Number} time 
     */
    constructor (componentType, time){
        this.componentType = componentType;
        this.time = time;
    }

    /**
     * @type {ComponentType}
     */
    componentType;
    /**
     * @type {Number}
     */
    time;
}