const ChannelName = require("./channelName");

module.exports = class DiscordChannel{
    /**
     * @type {String}
     */
    memberId;
    /**
     * @type {String}
     */
    channelId;
    /**
     * @type {String}
     */
    threadId;
	/**
     * @type {ChannelName}
     */
    name;
	/**
     * @type {String}
     */
    channelType;
}