module.exports = class DiscordEvent {
    /**
    * @type {String}
    */
    name;

    /**
     * @type {Boolean}
     */
    once;

    /**
     * @type {Promise}
    */
    execute;
}