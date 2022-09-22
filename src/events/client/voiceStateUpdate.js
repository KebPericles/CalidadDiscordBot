const tmpChanHandler = require('@root/src/misc/tempChannels/tempChannels.js');
const { VoiceState, Client } = require('discord.js');
const DiscordEvent = require('../../misc/classes/event');
/**
 * @type {DiscordEvent}
 */
module.exports = {
    name: 'voiceStateUpdate',
    /**
     * 
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     * @param {Client} client 
     * @returns 
     */
    async execute(oldState, newState, client) {
        let { createdChannels } = client;

        // Validate out or any other action that is not entering a channel
        if (oldState.channelId === newState.channelId) return;

        // Handle creating a temp channel
        if (Object.values(tmpChanHandler.CHANNEL_IDS).includes(newState.channelId)) {

            await tmpChanHandler.handleCreateChannel(client, oldState, newState);

        }

        // Handle moving to a generated channel
        //if (createdChannels.some((channel) => channel.channelId === newState.channelId)) return;

        // Handle moving out of the temp channel created before
        tmpChanHandler.handleTransDelChannel(oldState, newState, client);
    }
}