import { VoiceState, Client, Events } from 'discord.js';
import { DiscordEvent } from '@src/types';

const event: DiscordEvent = {
	name: Events.VoiceStateUpdate,
	async execute(oldState: VoiceState, newState: VoiceState, client: Client) {
		if (oldState.member === null || newState.member === null) {
			throw new Error("The voice state did not have a member. This could be a discord error");
		}

		// Validate out any other action that is not entering or exiting a channel
		if (oldState.channel?.id === newState.channel?.id) return;

		// Case entering a channel
		if (newState.channel !== null && 
			(oldState.channel === null || oldState.channel.id !== newState.channel.id)) {

		}


		/*
			NS
			SN
		*/


		// Handle creating a temp channel
		// Channel ids es CHISMECITO / GAMING / HOMEWORK
		if (channelIds.includes(newState.channelId)) {
			await create(oldState, newState);
		}

		// Handle moving to a generated channel
		//if (createdChannels.some((channel) => channel.channelId === newState.channelId)) return;

		// Handle moving out of the temp channel created before
		delete (oldState, newState);
	}
}

export default event;