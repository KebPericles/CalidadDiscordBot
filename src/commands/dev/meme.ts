import { MemeTemplate } from "@meme/types";
import { PAGE_DENSITY } from "@meme/memeTemplateManager";
import { DiscordCommand } from "@src/types";
import {
	CacheType,
	ChatInputCommandInteraction,
	Client,
	SlashCommandBuilder
} from "discord.js";

const getMemeTemplates = async (): Promise<Array<MemeTemplate>> => [];

const list = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	let templates = await getMemeTemplates();

	let pages = Math.ceil(templates.length / PAGE_DENSITY);
	let selPage = interaction.options.getInteger("pagina") || 1;
	selPage -= 1;

	interaction.page = selPage;

	if (pages < selPage || selPage < 0) {

		await interaction.reply({
			content: `Hay un máximo de ${pages} páginas`,
			ephemeral: true
		});

		return;
	}

	let memeList: DiscordUserInterface = require('@ui/Memes/MemeList');
	await memeList.sendInterface(interaction);
	await memeList.createCollectors(interaction);
}

const create = async (interaction: ChatInputCommandInteraction<CacheType>, client: Client<boolean>) => {
	const embed = createEmbed(client);

	await interaction.reply({
		embeds: [embed],
		//components: components, // Nosequesesto xD
	});
}

const updateList = async (interaction: ChatInputCommandInteraction<CacheType>) => {
	await updateMemeTemplates();

	await interaction.reply({
		content: ":white_check_mark:",
	});
}

const command: DiscordCommand = {
	data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Crea un meme personalizado")
		.addSubcommand((subcommand) => subcommand
			.setName("list")
			.setDescription("Te muestra la lista de memes posibles")
			.addIntegerOption((option) => option
				.setName("pagina")
				.setDescription("La página de memes que se puede poner")
				.setRequired(true))
		)
		.addSubcommand((subcommand) => subcommand
			.setName("create")
			.setDescription("Te muestra la lista de memes posibles")
		)
		.addSubcommand((subcommand) => subcommand
			.setName("update-list")
			.setDescription("Te actualiza la lista de memes")
		),

	async execute(interaction, client) {
		let subcommand = interaction.options.getSubcommand();

		switch (subcommand) {
			case "list": return list(interaction);
			case "create": return create(interaction, client);
			case "update-list": return updateList(interaction);
		}
	},
};

export default command;