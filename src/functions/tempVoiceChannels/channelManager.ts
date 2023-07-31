import { CategoryChannel, ChannelType, Client, GuildChannel, GuildMember, VoiceState } from "discord.js";
import { ChannelCategory, ConnectedVoiceState } from "@tempVC/types";
import generateChannelName, { generateActivityName } from "./channelNameSupplier";
import getCategoryFromID from "./channelCategories";

interface channelOptions {
	name: string,
	type: ChannelType.GuildVoice,
	position: number,
	parent: CategoryChannel | null
}

const createChannelOptions = (newState: ConnectedVoiceState, channelName: string): channelOptions => {
	if (newState.channel === null) {
		throw new Error("The VoiceState channel cannot be null")
	}

	return {
		name: channelName,
		type: ChannelType.GuildVoice,
		position: newState.channel.rawPosition,
		parent: newState.channel.parent,
	};
};

const createChannel = async (newState: ConnectedVoiceState) => {
	let category = getCategoryFromID(newState.channel.id) || ChannelCategory.CHISMECITO;
	let nameObject = generateChannelName(category, newState);
	let vcOptions = createChannelOptions(newState, nameObject.channelName);
	let tempVC = await newState.guild.channels.create(vcOptions);

	// MOVE USER TO CHANNEL
	newState.member.voice.setChannel(tempVC);

	// SAVE CHANNEL INFO
	createdChannels.push({
		memberId: newState.member.id,
		rawChannel: tempVC,
		//threadId: 0,
		name: nameObject,
		category: category
	});
};

const deleteChannel = async (index: number) => {
	let deletedChannel = createdChannels[index];
	createdChannels.splice(index, 1);
	deletedChannel.rawChannel.delete();
}

const transferChannelOwnership = async (index: number, newOwner: GuildMember) => {
	const channel = createdChannels[index];

	createdChannels[index].memberId = newOwner.id;
	//newOwner.send(`Ahora eres dueño de <#${createdChannels[index].channelId}>`);

	//Generar un nuevo nombre
	let newActivityName = generateActivityName(
		channel.category,
		newOwner.voice as ConnectedVoiceState
	);

	createdChannels[index].name.activity = newActivityName;
	channel.rawChannel.setName(channel.name.channelName);
}

export { createChannel, deleteChannel, transferChannelOwnership };