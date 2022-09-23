const {
    SlashCommandBuilder,
    EmbedBuilder,
    ComponentType,
    ActionRowBuilder,
    SelectMenuBuilder
}   = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Crea un meme personalizado'),
    async execute(interaction, client) {

        const selector = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('memeSelector')
                    .setPlaceholder('Seleccione un meme')
                    .addOptions(client.memeSelectorOptions.slice(0, 25))
            );
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Interfaz con calidad')
            .setAuthor({ name: 'Calidad Cyberpunk', iconURL: 'https://cdn.discordapp.com/emojis/771974836322959360.webp' })
            .setThumbnail(client.user.avatarURL())
            .addComponents(
                selector
            )
            .setFooter({ text: 'Bot hecho con calidad por Queso y Pan de piña', iconURL: 'https://cdn.discordapp.com/emojis/1001666667828486234.webp' });

        const message = await interaction.deferReply({
            fetchReply: true
        });

        await interaction.editReply({
            embeds: [embed],
            //components: [selector]
        });
    }
}