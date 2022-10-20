const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    /**
	 * @param {CommandInteraction} interaction
	 * @param {Client} client
	 */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.editReply({
                    content: `Something went wrong while executing this command`,
                    ephemeral: true
                })
            }
        }
    }
}