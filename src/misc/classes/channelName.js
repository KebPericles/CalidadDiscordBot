const { VoiceState } = require("discord.js");

module.exports = class ChannelName {
	/**
	 *
	 * @param {String} name
	 * @param {Boolean} canBeRenamed
	 * @param {Boolean} overrideLevel
	 * @param {ChannelNamePredicate} predicate
	 */
	constructor(name, canBeRenamed = true, overrideLevel = 0, predicate = () => true) {
		this.name = name;
		this.overrideLevel = overrideLevel;
		this.isValid = predicate;
		this.canBeRenamed = canBeRenamed;
	}

	/**
	 * @type {String}
	 */
	name;
	
	/**
	 * Valor para ver si se sobreescribe el nombre independientemente de los demás
	 * Si hay dos que se pueden sobreescribir, se toma el primero
	 * @type {Boolean}
	 */
	overrideLevel;

	/**
	 * Funcion que determina si el nombre se puede elegir o no
	 * @name ChannelNamePredicate
	 * @function
	 * @param {VoiceState} newState Estado del usuario
	 * @returns {Boolean} Si es elegible o no
	 */

	/**
	 * @type {ChannelNamePredicate}
	 */
	isValid;
	
	/**
	 * @type {Boolean}
	 */
	canBeRenamed;

	/**
	 * @type {String}
	 */
	activityName;
	
	/**
	 * @returns {String}
	 */
	getRawName = () => {
		return `${this.name} de ${this.activityName}`;
	};
};
