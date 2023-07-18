const { ActivityType } = require("discord.js");
const ChannelName = require("../../misc/classes/channelName");
const ChannelRegistry = require("../../misc/classes/channelRegistry");
//const channelTypes = require("./channelTypes");

const CHISMECITO_NAMES = [
	new ChannelName(`🪑┃Mesa`),
	new ChannelName(`🥵┃Cuarto`),
	new ChannelName(`🛌┃Cama`),
	new ChannelName(`🌠┃Balcón`),
	new ChannelName(`🌸┃Jardín`),
	//new ChannelName(`🍀┃Easter egg`, true, 1, (state) => state.deaf),
	//new ChannelName(`dasdasdasdsadasd`, false, 2, (state) => state.member.roles.cache.some(role => role.name === 'Felicidades Nalgona'))
];
const GAMING_NAMES = [
	new ChannelName(`🎮┃Sala gaming`),
	new ChannelName(`🔌┃Ciber`),
	new ChannelName(`👾┃Arcade`),
	new ChannelName(`🎰┃Casino`),
];
const HOMEWORK_NAMES = [
	new ChannelName(`📚┃Estudio`),
	new ChannelName(`🧪┃Laboratorio`),
	new ChannelName(`💻┃Hacking room`),
	new ChannelName(`🌌┃Observatorio`),
];

const generateChannelPlace = (client, channelType, newState) => {
	/**
	 * @type {ChannelRegistry}
	 */
	let registry = client.tempChannelRegistry;
	let channelTypes = registry.types;

	let namePool;
	switch (channelType) {
		default:
		case channelTypes.CHISMECITO:
			namePool = CHISMECITO_NAMES;
			break;

		case channelTypes.GAMING:
			namePool = GAMING_NAMES;
			break;

		case channelTypes.HOMEWORK:
			namePool = HOMEWORK_NAMES;
			break;
	}

	namePool = namePool.filter((chanName) => chanName.isValid(newState));

	let chosenOverrideLevel = -1;
	for (const name of namePool) {
		const currentLevel = name.overrideLevel;
		if (chosenOverrideLevel < currentLevel) {
			chosenOverrideLevel = currentLevel;
		}
	}

	namePool = namePool.filter(
		(chanName) => chanName.overrideLevel == chosenOverrideLevel
	);

	return namePool[Math.floor(Math.random() * namePool.length)];
};

/**
 * @param {VoiceState} newState
 */
const generateActivityName = (client, channelType, newState) => {
	/**
	 * @type {ChannelRegistry}
	 */
	let registry = client.tempChannelRegistry;
	let channelTypes = registry.types;

	let activityName = newState.member.nickname || newState.member.user.username;

	let activities = newState.member.presence?.activities || [];

	activities = activities.filter(x => x.type === ActivityType.Playing);

	if (activities.length >= 1 && channelType == channelTypes.GAMING) {
		activityName = activities[0].name;
	}

	return activityName;
};

/**
 * @param {VoiceState} newState
 * @returns {ChannelName}
 */
const generateChannelName = (client, channelType, newState) => {
	let activityName = generateActivityName(client, channelType, newState);
	let channelName = generateChannelPlace(client, channelType, newState);

	channelName.activityName = activityName;
	return channelName;
};

module.exports.generateChannelPlace = generateChannelPlace;
module.exports.generateActivityName = generateActivityName;
module.exports.generateChannelName = generateChannelName;
