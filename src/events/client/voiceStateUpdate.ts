import { VoiceState, Client, Events, NewsChannel } from 'discord.js';
import { DiscordEvent } from '@src/types';
import { CHANNEL_IDS } from '@tempVC/channelCategories';
import { createChannel } from '@tempVC/channelManager';
import { ConnectedVoiceState } from '@tempVC/types';

const event: DiscordEvent = {
	name: Events.VoiceStateUpdate,
	async execute(oldState: VoiceState, newState: VoiceState, client: Client) {
		if (!oldState.member || !newState.member) {
			throw new Error("The voice state did not have a member. This could be a discord error");
		}

		// Validate if the user is entering or exiting a channel
		if (oldState.channel?.id === newState.channel?.id) return;

		// Validate user entering a generator
		if (newState.channel !== null && CHANNEL_IDS.includes(newState.channel.id)) {
			await createChannel(newState as ConnectedVoiceState);
		}

		// Entering a channel other than a generator does nothing
		if (oldState.channel === null) return;

		// No channel has been created, no need to delete or transfer ownership
		if (createdChannels.length === 0) return;

		// Check if the previous channel was a tempVc
		const index = createdChannels.findIndex(
			(channel) => channel.channelId === oldState.channelId
		);

		if (index === -1) return;

		const prevChannel = createdChannels[index];

		// Delete temp channel if its empty
		if (oldState.channel.members.size === 0) return deleteChannel(index);

		// Transfer the channel ownership to another member
		if (oldState.member.id === prevChannel.memberId)
			return transferChannelOwnership(index, oldState.channel.members.at(0));
	}
}

export default event;