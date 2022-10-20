const {
	SlashCommandBuilder,
	EmbedBuilder,
	Client,
	CommandInteraction,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ComponentType,
	Message,
} = require("discord.js");

const MemeTemplate = require("./../../misc/classes/memeTemplate.js");

const pageDensity = 5;

const {
	getMemeTemplates,
	updateMemeTemplates,
} = require("./../../misc/memeGenerator/memeTemplateHandler");

const createEmbed = (client) => {
	return new EmbedBuilder()
		.setColor(0x0099ff)
		.setAuthor({
			name: "Calidad Cyberpunk",
			iconURL:
				"https://cdn.discordapp.com/emojis/771974836322959360.webp",
		})
		.setThumbnail(client.user.avatarURL())
		.setFooter({
			text: "Bot hecho con calidad por Queso y Pan de piña",
			iconURL:
				"https://cdn.discordapp.com/emojis/1001666667828486234.webp",
		});
};

/**
 * @param {Number} page
 */
const embedPage = async (client, page) => {
	let templates = await getMemeTemplates();
	let embed = createEmbed(client).setTitle("Lista de memes:");

	for (let i = 0; i < pageDensity; i++) {
		let template = templates[(page) * pageDensity + i];

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

module.exports = {
	data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Crea un meme personalizado")
		.addSubcommand((subcommand) => {
			return subcommand
				.setName("list")
				.setDescription("Te muestra la lista de memes posibles")
				.addIntegerOption((option) => {
					return option
						.setName("pagina")
						.setDescription("La página de memes que se puede poner")
						.setRequired(true);
				});
		})
		.addSubcommand((subcommand) => {
			return subcommand
				.setName("create")
				.setDescription("Te muestra la lista de memes posibles");
		})
		.addSubcommand((subcommand) => {
			return subcommand
				.setName("update-list")
				.setDescription("Te muestra la lista de memes posibles");
		}),

	/**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		// MESSAGE RECEIVED
		const message = await interaction.deferReply({
			fetchReply: true,
		});

		let subcommand = interaction.options._subcommand;
		let templates = await getMemeTemplates();
		let components = [];

		const embed = createEmbed(client);

		switch (subcommand) {
			case "list":
				const buttons = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId("previous")
						.setEmoji("◀️")
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId("next")
						.setEmoji("▶️")
						.setStyle(ButtonStyle.Secondary)
				);

				components.push(buttons);

				let pages = Math.ceil(templates.length / pageDensity);
				let selPage = interaction.options._hoistedOptions[0].value - 1;

				if (pages < selPage || selPage < 0) {

					await interaction.editReply({
						content: `Hay un máximo de ${pages} páginas`,
						ephemeral: true
					});

					return;
				}

				const listMessage = await interaction.fetchReply();

				await listMessage.edit({
					embeds: [await embedPage(client, selPage)],
					components: components,
					ephemeral: true
				});

				const listCollector =
					listMessage.createMessageComponentCollector({
						componentType: ComponentType.Button,
						time: 60000
					});

				// dispose | collect | ignore
				listCollector.on("collect", async (i) => {
					selPage += i.customId == "next" ? 1 : -1;
					selPage = (selPage + pages) % pages;
					await i.message.edit({
						embeds: [await embedPage(client, selPage)],
						components: components,
					});
					i.deferUpdate();
				});

				return;
			case "create":
				break;
			case "update-list":
				await updateMemeTemplates();

				await interaction.editReply({
					content: ":white_check_mark:",
				});

				return;
		}

		await interaction.editReply({
			embeds: [embed],
			components: components,
		});
	},
};
