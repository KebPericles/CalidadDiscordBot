module.exports = class SelectMenuOption{
    /**
     * @type {String}
     */
    label;

    /**
     * @type {String}
     */
    description;

    /**
     * @type {String}
     */
    value;

    /**
     * @param {String} label
     * @param {String} description
     * @param {String} value
     */
    constructor(label, value, description = undefined) {
        this.label = label;
        this.description = description;
        this.value = value;
    }
}