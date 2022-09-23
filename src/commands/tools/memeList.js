const { SlashCommandBuilder, EmbedBuilder, CommandInteraction } = require('discord.js');
const MemeTemplate = require('./../../misc/classes/memeTemplate.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('memelist')
		.setDescription('Information about the ping'),

    /**
     * @param {CommandInteraction} interaction
     */
	async execute(interaction, client) {

		client.memeTemplates.forEach(
			/**
			 * @param {MemeTemplate} template
			 */
			function (template) {
				const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(template.name)
                    .setImage(template.example.url)
                    .setAuthor({ name: 'Calidad Cyberpunk', iconURL: 'https://cdn.discordapp.com/emojis/771974836322959360.webp' })
                    .setFooter({ text: 'Bot hecho con calidad por Queso y Pan de piña', iconURL: 'https://cdn.discordapp.com/emojis/1001666667828486234.webp' });
                interaction.channel.send({embeds: [embed]});
			});


		const message = await interaction.deferReply({
			fetchReply: true
		})
		const newMessage = `Te mandé DM`
		await interaction.editReply({
			content: newMessage
		});
	}
}