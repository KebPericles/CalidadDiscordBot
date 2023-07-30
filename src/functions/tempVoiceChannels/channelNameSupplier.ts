import { ActivityType, Client } from "discord.js";
import { ChannelName, ChannelCategory, ConnectedVoiceState } from "@tempVC/types";

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

const generateChannelPlace = (category: ChannelCategory, newState: ConnectedVoiceState) => {
	let namePool;

	switch (category) {
		default:
		case ChannelCategory.CHISMECITO:
			namePool = CHISMECITO_NAMES;
			break;

		case ChannelCategory.GAMING:
			namePool = GAMING_NAMES;
			break;

		case ChannelCategory.HOMEWORK:
			namePool = HOMEWORK_NAMES;
			break;
	}

	namePool = namePool.filter((name) => name.isValid(newState));

	/*
	let chosenOverrideLevel = -1;
	for (const name of namePool) {
		const currentLevel = name.overrideLevel;
		if (chosenOverrideLevel < currentLevel) {
			chosenOverrideLevel = currentLevel;
		}
	}
	*/

	const chosenOverrideLevel = namePool.reduce((level, name) => {
		const currentLevel = name.overrideLevel;
		return level < currentLevel ? currentLevel : level;
	}, 0);

	namePool = namePool.filter(
		(name) => name.overrideLevel === chosenOverrideLevel
	);

	return namePool[Math.floor(Math.random() * namePool.length)];
};

const generateActivityName = (category: ChannelCategory, newState: ConnectedVoiceState) => {
	let activityName = newState.member.nickname || newState.member.user.username;

	let activities = newState.member.presence?.activities || [];

	activities = activities.filter(x => x.type === ActivityType.Playing);

	if (activities.length >= 1 && category === ChannelCategory.GAMING) {
		activityName = activities[0].name;
	}

	return activityName;
};

const generateChannelName = (category: ChannelCategory, newState: ConnectedVoiceState) => {
	let activityName = generateActivityName(category, newState);
	let channelName = generateChannelPlace(category, newState);

	channelName.activity = activityName;
	return channelName;
};

export default generateChannelName;
