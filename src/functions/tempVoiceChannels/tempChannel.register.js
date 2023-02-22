const { Client } = require("discord.js");
const fs = require("fs");
const DiscordEvent = require("../../misc/classes/event");
const {
	generateChannelPlace,
	generateActivityName,
	generateChannelName,
} = require("./channelNameSupplier");
const { getTypeFromID, channelTypes } = require("./channelTypes");
const {
	handleCreateChannel,
	handleTransDelChannel,
} = require("./tempChannels");
const UIS_DIR = "src/ui";
require("dotenv").config("../../../.env");

/**
 * @param {Client} client
 */
module.exports = (client) => {
	let { CHISMECITO_ID, GAMING_ID, HOMEWORK_ID } = process.env;

	client.tempChannelRegistry = Object.freeze({
		naming: {
			generateActivityName: (channelType, newState) => generateActivityName(client, channelType, newState),
			generateNamingObject: (channelType, newState) => generateChannelName(client, channelType, newState),
		},
		channelIds: [CHISMECITO_ID, GAMING_ID, HOMEWORK_ID],
		types: channelTypes,
		getChannelTypeFromId: getTypeFromID,
		create: (oldState, newState) =>
			handleCreateChannel(client, oldState, newState),
		delete: (oldState, newState) =>
			handleTransDelChannel(client, oldState, newState),
	});
};
