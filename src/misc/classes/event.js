module.exports = class DiscordEvent {
    /**
    * @type {String}
    */
    name;

    /**
     * @type {Boolean | undefined}
     */
    once;

    /**
     * @type {Promise}
    */
    execute;
}