import {ChannelCategory} from '@tempVC/types';

const { CHISMECITO_ID, GAMING_ID, HOMEWORK_ID } = process.env;

const getCategoryFromID = (id: string): ChannelCategory | null => {
	switch (id) {
		case CHISMECITO_ID:
			return ChannelCategory.CHISMECITO;

		case GAMING_ID:
			return ChannelCategory.GAMING;

		case HOMEWORK_ID:
			return ChannelCategory.HOMEWORK;
			
		default:
			return null;
	}
};

export default getCategoryFromID;

export const CHANNEL_IDS = Object.freeze([CHISMECITO_ID, GAMING_ID, HOMEWORK_ID]);