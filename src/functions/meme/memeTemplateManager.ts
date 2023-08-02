import { MemeTemplate } from "@meme/types";

//const fetch = (...args) =>
//	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const TEMPLATES_URL = "https://api.memegen.link/templates/";
const SETTINGS = { method: "Get" };

const PAGE_DENSITY = 5;

var memeTemplates: Array<MemeTemplate> = [];

const updateMemeTemplates = async () => {
	return memeTemplates = await fetch(TEMPLATES_URL, SETTINGS)
		.then((res) => res.json()) as Array<MemeTemplate>;
};

const getMemeTemplates = async (): Promise<Array<MemeTemplate>> => {
	if (memeTemplates = []) {
		return await updateMemeTemplates();
	}

	return memeTemplates;
};

const embedPage = async (page: number) => {
	let templates = await getMemeTemplates();
	let embed = defaultEmbed().setTitle("Lista de memes:");

	for (let i = 0; i < PAGE_DENSITY; i++) {
		let template = templates[page * PAGE_DENSITY + i];

		if (!template) {
			break;
		}

		embed.addFields({
			name: template.id,
			value: `${template.name}\nNúmero de líneas:${template.lines}\n${template.blank}\nEjemplo:${template.example.url}`,
		});
	}

	return embed;
};

export {getMemeTemplates, updateMemeTemplates, embedPage, PAGE_DENSITY}
