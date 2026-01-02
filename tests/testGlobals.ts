import { DiscordCommand } from "#root/src/types";
import { Collection, EmbedBuilder } from "discord.js";

let commands = new Collection<string, DiscordCommand>();
let createdChannels = [];
let defaultEmbed = () =>
	new EmbedBuilder()
		.setColor(0x0099ff)
		.setAuthor({
			name: "Manchas Cyberpunk",
			iconURL: "https://cdn.discordapp.com/emojis/771974836322959360.webp",
		})
		.setFooter({
			text: "Bot hecho con calidad por Pan con Queso",
			iconURL: "https://cdn.discordapp.com/emojis/1001666667828486234.webp",
		});

export { commands, createdChannels, defaultEmbed };
