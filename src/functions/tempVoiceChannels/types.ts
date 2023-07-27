import {VoiceState} from "discord.js";

export enum ChannelCategory {
	CHISMECITO = "CHISMECITO",
	GAMING = "GAMING",
	HOMEWORK = "HOMEWORK"
}

export default class ChannelName {
	constructor(
		place: string,
		activity: string,
		canBeRenamed: boolean = true,
		overrideLevel: number = 0,
		predicate: ChannelNamePredicate = () => true
	) {
		this.place = place;
		this.activity = activity;
		this.overrideLevel = overrideLevel;
		this.isValid = predicate;
		this.canBeRenamed = canBeRenamed;
	}

	place: string;
	activity: string;
	overrideLevel: number;
	isValid: ChannelNamePredicate;
	canBeRenamed: boolean;

	getRawName = (): string => {
		return `${this.place} de ${this.activity}`;
	};
}

export interface DiscordChannel {
	memberId: string;
	channelId: string;
	threadId: string;
	name: ChannelName;
	channelType: string;
}

export type ChannelNamePredicate = (newState: VoiceState) => boolean;

/*
export interface ChannelRegistry {
	naming: NameGenerator;
	getChannelTypeFromId: (id: string) => string;
	create: (oldState: VoiceState, newState: VoiceState) => void;
	delete: (oldState: VoiceState, newState: VoiceState) => void
	channelIds: Array<string>
}
*/

export interface NameGenerator {
	generateActivityName: (channelType: string, newState: VoiceState) => string;
	generateNamingObject: (channelType: string, newState: VoiceState) => ChannelName;
}