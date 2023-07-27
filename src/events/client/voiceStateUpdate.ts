import { VoiceState, Client, Events } from 'discord.js';
import { DiscordEvent } from '@src/types';

const event: DiscordEvent ={
    name: Events.VoiceStateUpdate,
    async execute(oldState: VoiceState, newState: VoiceState, client: Client) {
        console.log(createdChannels);

        // Validate out any other action that is not entering or exiting a channel
        if (oldState.channelId === newState.channelId) return;

        // Handle creating a temp channel
        if (channelIds.includes(newState.channelId)) {
            await create(oldState, newState);
        }

        // Handle moving to a generated channel
        //if (createdChannels.some((channel) => channel.channelId === newState.channelId)) return;

        // Handle moving out of the temp channel created before
        delete(oldState, newState);
    }
}

export default event;