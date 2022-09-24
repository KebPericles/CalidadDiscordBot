const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const MemeTemplate = require("./../classes/memeTemplate.js");

const TEMPLATES_URL = "https://api.memegen.link/templates/";
const SETTINGS = { method: "Get" };

let memeTemplates = [];

/**
 * 
 * @returns {Promise<Array<MemeTemplate>>}
 */
const updateMemeTemplates = async () => {
	return memeTemplates = await fetch(TEMPLATES_URL, SETTINGS)
		.then((res) => res.json());
};

/**
 * 
 * @returns {Promise<Array<MemeTemplate>>}
 */
 const getMemeTemplates = async () => {
	if (memeTemplates = []) {
		return await updateMemeTemplates();
	}

	return memeTemplates;
};

module.exports.getMemeTemplates = getMemeTemplates;
module.exports.updateMemeTemplates = updateMemeTemplates;
