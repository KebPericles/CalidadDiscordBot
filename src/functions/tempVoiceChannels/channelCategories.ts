import {ChannelCategory} from '@tempVC/types';

const { CHISMECITO_ID, GAMING_ID, HOMEWORK_ID } = process.env;

const getCategoryFromID = (id: string): ChannelCategory => {
	switch (id) {
		default:
		case CHISMECITO_ID:
			return ChannelCategory.CHISMECITO;

		case GAMING_ID:
			return ChannelCategory.GAMING;

		case HOMEWORK_ID:
			return ChannelCategory.HOMEWORK;
	}
};

export default getCategoryFromID;