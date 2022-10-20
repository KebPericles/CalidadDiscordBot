const DiscordCollector = require("../../misc/classes/collector");
const DiscordComponent = require("../../misc/classes/component");
const DiscordUserInterface = require("../../misc/classes/ui");
/**
 * @type {DiscordUserInterface}
 */
module.exports = new DiscordUserInterface({
    embeds: [],
    components: [],
    collectorsToCreate: []
})