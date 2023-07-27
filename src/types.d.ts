import { Client, SlashCommandBuilder, VoiceState } from "discord.js";

export interface DiscordEvent {
        name: string;
        once?: boolean;
        execute: (...args: any) => Promise<void>;
}

export interface DiscordCommand {
        data: SlashCommandBuilder;
        execute: (...args: any) => Promise<void>;
}