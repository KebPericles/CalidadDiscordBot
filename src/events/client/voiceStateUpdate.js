//const tmpChanHandler = require('@root/src/misc/tempChannels/tempChannels.js');
const { VoiceState, Client, Events } = require('discord.js');
const ChannelRegistry = require('../../misc/classes/channelRegistry');
const DiscordEvent = require('../../misc/classes/event');
/**
 * @type {DiscordEvent}
 */
module.exports = {
    name: Events.VoiceStateUpdate,
    /**
     * 
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     * @param {Client} client 
     * @returns 
     */
    async execute(oldState, newState, client) {
        let { createdChannels } = client;

        // Validate out any other action that is not entering or exiting a channel
        if (oldState.channelId === newState.channelId) return;

		// Get the temp Voice Chat registry
		/**
		 * @type {ChannelRegistry}
	     */
		let tempVCRegistry = client.tempChannelRegistry;

        // Handle creating a temp channel
        if (tempVCRegistry.channelIds.includes(newState.channelId)) {
			await tempVCRegistry.create(oldState, newState);
        }

        // Handle moving to a generated channel
        //if (createdChannels.some((channel) => channel.channelId === newState.channelId)) return;

        // Handle moving out of the temp channel created before
        tempVCRegistry.delete(oldState, newState);
    }
}