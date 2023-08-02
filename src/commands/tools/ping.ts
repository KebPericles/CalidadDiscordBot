import { DiscordCommand } from "@root/src/types";

const { SlashCommandBuilder } = require('discord.js');

const command: DiscordCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Information about the ping'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        })
        const newMessage = `API latency ${client.ws.ping}\nClient ping: ${message.createdTimestamp - interaction.createdTimestamp}`
        await interaction.editReply({
            content: newMessage
        });
    }
}

export default command;