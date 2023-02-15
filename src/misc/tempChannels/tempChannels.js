const { Client, VoiceState, VoiceChannel } = require('discord.js');
const DiscordChannel = require('../classes/channel');

const CHANNEL_IDS = {
	CHISMECITO: '1021992618206433350',
	GAMING: '1021992662074654792',
	HOMEWORK: '1021992688058388510'
}

const BOT_ID = '1021559983067910264';

const CHISMECITO_NAMES = [
	`🪑┃Mesa`,
	`🥵┃Cuarto`,
	`🛌┃Cama`,
	`🌠┃Balcón`,
	`🌸┃Jardín`
];
const GAMING_NAMES = [
	`🎮┃Sala gaming`,
	`🔌┃Ciber`,
	`👾┃Arcade`,
	`🎰┃Casino`
];
const HOMEWORK_NAMES = [
	`📚┃Estudio`,
	`🧪┃Laboratorio`,
	`👨‍💻┃Hacking room`,
	`🌌┃Observatorio`
];

const getNameArray = (id) => {
	switch (id) {
		default:
		case CHANNEL_IDS.CHISMECITO:
			return CHISMECITO_NAMES
			break;

		case CHANNEL_IDS.GAMING:
			return GAMING_NAMES
			break;

		case CHANNEL_IDS.HOMEWORK:
			return HOMEWORK_NAMES
			break;
	}
}

/**
 * @param {VoiceState} newState
*/
const generateChannelName = (newState) => {
	// TODO HACER EL LOG DE LAS COSAS IMPORTANTES
	let username = newState.member.nickname;
	if (!username) {
		username = newState.member.user.username;
	}

	// console.log(newState.member);
	let activities = newState.member.presence.activities;
	let activityName = username;
	if (activities.length >= 1 && newState.channelId === CHANNEL_IDS.GAMING) {
		activityName = activities[activities.length - 1].name;
	}

	let nameArray = getNameArray(newState.channelId);
	return `${nameArray[Math.floor(Math.random() * nameArray.length)]} de ${activityName}`
}

/**
 * @param {VoiceState} newState
*/
const createChannelOptions = (newState) => {
	let name = generateChannelName(newState);

	// TODO CHANNEL NAME
	// TODO PERMISSION
	return {
		name: name,
		type: 2,
		position: newState.channel.rawPosition,
		parent: newState.channel.parent,
	}
}

/**
 * @param {Client} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * 
*/
const handleCreateChannel = async (client, oldState, newState) => {
	// CREATE CHANNEL
	/**
	 * @type {VoiceChannel}
	 */

	let vcOptions = createChannelOptions(newState);
	let tempVC = await newState.guild.channels.create(vcOptions);

	// MOVE USER TO CHANNEL
	newState.member.voice.setChannel(tempVC);

	// SAVE CHANNEL INFO
	client.createdChannels.push({
		memberId: newState.member.id,
		channelId: tempVC.id,
		threadId: 0
	});
};

/**
 * 
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 * @param {Client} client 
 * @returns 
 */
const handleTransDelChannel = (oldState, newState, client) => {
	/**
	 * @type {Array<DiscordChannel>}
	 */
	const createdChannels = client.createdChannels;
	console.log(createdChannels);

	// Find if its owner of a channel
	let channel = createdChannels.find(({ channelId }) => {
		return channelId === oldState.channelId;
	});

	// Not owner of the channel
	if (channel === undefined || oldState.channel === null) return;

	// Handle giving the ownership to a member in the channel
	if (oldState.channel.members.size !== 0) {
		channel.memberId = oldState.channel.members.at(0).id;
		return;
	}

	// Deletes the channel
	oldState.channel.delete('Porque si');
	createdChannels.splice(createdChannels.indexOf(channel), 1);
	console.log(createdChannels)
}

module.exports.handleCreateChannel = handleCreateChannel;
module.exports.handleTransDelChannel = handleTransDelChannel;
module.exports.CHANNEL_IDS = CHANNEL_IDS;