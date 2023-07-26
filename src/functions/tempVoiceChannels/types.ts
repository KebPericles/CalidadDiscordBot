import {VoiceState} from "discord.js";
import ChannelName from "./ChannelName";

export interface DiscordChannel {
	memberId: string;
	channelId: String;
	threadId: String;
	name: ChannelName;
	channelType: String;
}

export type ChannelNamePredicate = (newState: VoiceState) => boolean;

export interface ChannelRegistry {
	naming: NameGenerator;
	getChannelTypeFromId: (id: string) => string;
	create: (oldState: VoiceState, newState: VoiceState) => void;
	delete: (oldState: VoiceState, newState: VoiceState) => void
	channelIds: Array<string>
}

export interface NameGenerator {
	generateActivityName: (channelType: string, newState: VoiceState) => string;
	generateNamingObject: (channelType: string, newState: VoiceState) => ChannelName;
}