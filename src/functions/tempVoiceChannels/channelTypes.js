const { CHISMECITO_ID, GAMING_ID, HOMEWORK_ID } = process.env;

let channelTypes = Object.freeze({
	CHISMECITO: "chismecito",
	GAMING: "gaming",
	HOMEWORK: "homework",
});

const getTypeFromID = (id) => {
	switch (id) {
		default:
		case CHISMECITO_ID:
			return channelTypes.CHISMECITO;

		case GAMING_ID:
			return channelTypes.GAMING;

		case HOMEWORK_ID:
			return channelTypes.HOMEWORK;
	}
};

module.exports.channelTypes = channelTypes;
module.exports.getTypeFromID = getTypeFromID;