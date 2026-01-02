import { CommandInteraction, Client, Events } from "discord.js";
import { DiscordEvent } from "#src/types";
import * as global from "#src/global";

const event: DiscordEvent = {
	name: Events.InteractionCreate,
	async execute(interaction: CommandInteraction, client: Client) {
		if (interaction.isChatInputCommand()) {
			const { commandName } = interaction;
			const command = global.commands.get(commandName);

			if (!command) return;

			try {
				await command.execute(interaction, client);
			} catch (error) {
				console.error(error);
				const errorMessage =
					"Something went wrong while executing this command";

				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: errorMessage,
						ephemeral: true,
					});
				} else {
					await interaction.reply({
						content: errorMessage,
						ephemeral: true,
					});
				}
			}
		}
	},
};

export { event };
