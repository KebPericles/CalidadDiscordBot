import { CommandInteraction, Client, Events } from "discord.js";

const event = {
    name: Events.InteractionCreate,
    async execute(interaction: CommandInteraction, client: Client) {
        if (interaction.isChatInputCommand()) {
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Something went wrong while executing this command`,
                    ephemeral: true
                })
            }
        }
    }
}

export default event;