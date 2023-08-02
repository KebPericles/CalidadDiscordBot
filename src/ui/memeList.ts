import { getMemeTemplates } from "@meme/memeTemplateManager";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	CommandInteraction,
	ComponentType,
} from "discord.js";

const collectEvent = async (interaction: ButtonInteraction, command: CommandInteraction) => {
	let templates = await getMemeTemplates();
	this.selPage = this.selPage === undefined ? command.options._hoistedOptions[0].value - 1 : this.selPage;
	let pages = Math.ceil(templates.length / pageDensity);

	interaction.deferUpdate();

	this.selPage += interaction.customId == "next" ? 1 : -1;
	this.selPage = (this.selPage + pages) % pages;

	command.page = this.selPage;

	await interaction.message.edit({
		embeds: [await embedPage(command)],
		components: [(await actionRow()).getComponent()]
	});

};

const childComponents = [
	new DiscordComponent({
		component:
			new ButtonBuilder()
				.setCustomId("previous")
				.setEmoji("◀️")
				.setStyle(ButtonStyle.Secondary),
		componentType: ComponentType.Button,
		id: "previous",
		collect: collectEvent
	}),
	new DiscordComponent({
		component:
			new ButtonBuilder()
				.setCustomId("next")
				.setEmoji("▶️")
				.setStyle(ButtonStyle.Secondary),
		componentType: ComponentType.Button,
		id: "next",
		collect: collectEvent
	})
];

const actionRow = async () => {
	return new DiscordComponent({
		component: new ActionRowBuilder(),
		componentType: ComponentType.ActionRow,
		childComponents: childComponents,
		isRowComponent: true
	});
};

const collectors = [
	new DiscordCollector(ComponentType.Button, 60000)
];

module.exports = new DiscordUserInterface({
	embeds: [embedPage],
	components: [actionRow],
	collectorsToCreate: collectors
});