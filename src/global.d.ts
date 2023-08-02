import { DiscordChannel } from "@tempVC/types";
import { Collection, EmbedBuilder } from "discord.js";
import { DiscordCommand } from "./types";

declare global { 
	var createdChannels: Array<DiscordChannel>;
	var commands: Collection<string, DiscordCommand>;
	var defaultEmbed: () => EmbedBuilder;
}

export {}