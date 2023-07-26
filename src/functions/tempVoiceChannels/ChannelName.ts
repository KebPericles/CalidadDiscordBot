import { ChannelNamePredicate } from "./types";

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