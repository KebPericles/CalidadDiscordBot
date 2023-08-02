import { ChatInputCommandInteraction, Client, ComponentType, SlashCommandBuilder } from "discord.js";

type DiscordSlashCommandBuilder = Omit<SlashCommandBuilder, "addBooleanOption" | "addUserOption" | "addChannelOption" | "addRoleOption" | "addAttachmentOption" | "addMentionableOption" | "addStringOption" | "addIntegerOption" | "addNumberOption">

export interface DiscordEvent {
        name: string;
        once?: boolean;
        execute: (...args: any) => Promise<void>;
}

export interface DiscordCommand {
        data: DiscordSlashCommandBuilder;
        execute: (interaction: ChatInputCommandInteraction, client: Client) => Promise<void>;
}

export interface DiscordCollector {
	componentType: ComponentType;
	time: number;
}