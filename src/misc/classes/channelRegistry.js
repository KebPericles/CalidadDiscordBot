const { VoiceState } = require("discord.js");
const ChannelName = require("./channelName");

module.exports = class ChannelRegistry {
	/**
	 * Objeto para poder cambiar el nombre de los canales de voz
	 * @type {ChannelNamingRegistry}
     */
	naming;

	/**
	 * 
	 * @param {String} id
	 * @returns {String}
     */
	getChannelTypeFromId(id){}

	/**
	 * Crea un canal en caso de que el estado lo amerite
	 * @param {VoiceState} oldState
	 * @param {VoiceState} newState
     */
	create(oldState, newState){}

	/**
	 * Borra un canal en caso de que el estado lo amerite
	 * @param {VoiceState} oldState
	 * @param {VoiceState} newState
     */
	delete(oldState, newState){}

	/**
	 * @type {Array<String>}
     */
	channelIds
	
	types
};

class ChannelNamingRegistry{

	/**
	 * Genera el nombre de la actividad en cierto momento del canal cuando hay un cambio
	 * @param {String} channelType El tipo del canal
	 * @param {VoiceState} newState El nuevo estado del evento de voz
	 * @returns {String} El nombre de la nueva actividad que hay en el canal
     */
    generateActivityName(channelType, newState){}

	/**
	 * Genera el objeto que contiene los datos del nombre del canal
	 * @param {String} channelType El tipo del canal
	 * @param {VoiceState} newState El nuevo estado del evento de voz
	 * @returns {ChannelName}
     */
    generateNamingObject(channelType, newState){}
}
