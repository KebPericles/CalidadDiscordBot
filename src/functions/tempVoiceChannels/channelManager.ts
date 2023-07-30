import { ChannelType, Client, VoiceState } from "discord.js";
import getCategoryFromID from "./channelCategories";
import { ConnectedVoiceState } from "@tempVC/types";

const createChannelOptions = (newState: ConnectedVoiceState, rawName: string) => {
	if (newState.channel === null) {
		throw new Error("The VoiceState channel cannot be null")
	}

	return {
		name: rawName,
		type: ChannelType.GuildVoice,
		position: newState.channel.rawPosition,
		parent: newState.channel.parent,
	};
};

const createChannel = async (newState: ConnectedVoiceState) => {
	
	
	console.log(getCategoryFromID(newState.channelId));

	let nameObject =
		registry.naming.generateNamingObject(
			registry.getChannelTypeFromId(newState.channelId),
			newState
		);
	let vcOptions = createChannelOptions(newState, nameObject.getRawName());
	let tempVC = await newState.guild.channels.create(vcOptions);

	// MOVE USER TO CHANNEL
	newState.member.voice.setChannel(tempVC);

	// SAVE CHANNEL INFO
	client.createdChannels.push({
		memberId: newState.member.id,
		channelId: tempVC.id,
		threadId: 0,
		name: nameObject,
		type: registry.getChannelTypeFromId(newState.channelId)
	});
};

/**
 *
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @param {Client} client
 * @returns
 */
const handleTransDelChannel = (client, oldState, newState) => {
	/**
	 * @type {ChannelRegistry}
	 */
	let registry = client.tempChannelRegistry;

	/**
	 * @type {Array<DiscordChannel>}
	 */
	const createdChannels = client.createdChannels;
	//console.log(createdChannels);

	// Find if its owner of a channel
	/*let channel = createdChannels.find(({ channelId }) => {
		return channelId === oldState.channelId;
	});
	*/

	if (!createdChannels || createdChannels.length === 0) {
		return;
	}

	let index = -1;

	/**
	 * @type {DiscordChannel}
	 */
	let channel;

	for (let i = 0; i < createdChannels.length; i++) {
		const currentChannel = createdChannels[i];
		if (currentChannel.channelId === oldState.channelId) {
			channel = currentChannel;
			index = i;
			break;
		}
	}

	console.log(channel);

	// Not owner of the channel
	if (index === -1 || !channel || oldState.channel === null) return;

	// Handle giving the ownership to a member in the channel
	if (oldState.channel.members.size !== 0) {
		if (oldState.member.id == channel.memberId &&
			(!newState.member.voice || !newState.member.voice.channelId)) {

			let newOwner = oldState.channel.members.at(0);
			client.createdChannels[index].memberId = newOwner.id;
			//newOwner.send(`Ahora eres dueño de <#${createdChannels[index].channelId}>`);

			//Generar un nuevo nombre
			if (channel.name.canBeRenamed) {
				let newActivityName = registry.naming.generateActivityName(channel.type, newOwner.voice);
				console.log(newActivityName);
				client.createdChannels[index].name.activityName = newActivityName;
				oldState.channel.setName(client.createdChannels[index].name.getRawName());
			}
		}

		return;
	}

	// Deletes the channel
	oldState.channel.delete("Porque si");
	createdChannels.splice(createdChannels.indexOf(channel), 1);
};

module.exports.handleCreateChannel = handleCreateChannel;
module.exports.handleTransDelChannel = handleTransDelChannel;