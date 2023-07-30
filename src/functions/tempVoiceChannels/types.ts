import { GuildMember, Snowflake, VoiceBasedChannel, VoiceState } from "discord.js";

export enum ChannelCategory {
	CHISMECITO = "CHISMECITO",
	GAMING = "GAMING",
	HOMEWORK = "HOMEWORK"
}

export class ChannelName {
	constructor(
		location: string,
		activity: string = "",
		canBeRenamed: boolean = true,
		overrideLevel: number = 0,
		predicate: ChannelNamePredicate = () => true
	) {
		this._location = location;
		this._activity = activity;
		this.overrideLevel = overrideLevel;
		this.isValid = predicate;
		this.canBeRenamed = canBeRenamed;
	}

	private _location: string;
	private _activity: string;
	private canBeRenamed: boolean;
	public readonly overrideLevel: number;
	public isValid: ChannelNamePredicate;

	getChannelName = (): string => {
		return `${this._location} de ${this.activity}`;
	};


	public set location(v: string) {
		if (this.canBeRenamed)
			this._location = v;
	}

	public get location() {
		return this._location;
	}

	public set activity(v: string) {
		if (this.canBeRenamed || this._activity === null || this._activity.trim() === "")
			this._activity = v;
	}

	public get activity() {
		return this._activity;
	}

}

export interface DiscordChannel {
	memberId: string;
	channelId: string;
	threadId: string;
	name: ChannelName;
	channelType: string;
}

export interface ConnectedVoiceState extends VoiceState {
	channel: VoiceBasedChannel;
	member: GuildMember;
	channelId: Snowflake;
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

export interface NameGenerator {
	generateActivityName: (channelType: string, newState: VoiceState) => string;
	generateNamingObject: (channelType: string, newState: VoiceState) => ChannelName;
}
*/