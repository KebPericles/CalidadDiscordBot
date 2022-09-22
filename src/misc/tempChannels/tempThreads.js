const { VoiceState, TextChannel, Client, ThreadChannel } = require("discord.js");
const DiscordChannel = require("../classes/channel");
const THREAD_CHANNEL_ID = '1022301261678247996';


const createThreadOptions = (newState) => {
	return {
		name: `interfaz-${newState.member.id}`,
		reason: 'Needed a separate thread for managing the temp vc'

	};
}

/**
 * 
 * @param {VoiceState} state 
 * @param {Client} client 
 * @returns 
 */
const handleCreateThread = async (state, client) => {
    // CREATE THREAD
    /**
     * @type {TextChannel}
     */
    let threadChannelParent = await state.guild.channels.fetch(THREAD_CHANNEL_ID);
    let threadChannel = await threadChannelParent.threads.create(createThreadOptions(state));

    return threadChannel;
}

/**
 * 
 * @param {VoiceState} state 
 * @param {DiscordChannel} channel 
 * @param {Client} client 
 */
const handleDestroyThread = async (state, channel,client)=>{
    /**
     * @type {TextChannel}
     */
    const threadChannelParent = await state.guild.channels.fetch(THREAD_CHANNEL_ID);
    console.log(threadChannelParent)
    /**
     * @type {ThreadChannel}
     */
    const thread = await threadChannelParent.threads.fetch(channel.threadId);
    await thread.delete('No queremos mil threads >_<');
    
}

module.exports.handleCreateThread = handleCreateThread;
module.exports.handleDestroyThread = handleDestroyThread;