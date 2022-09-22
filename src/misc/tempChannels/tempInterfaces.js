const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Client,
	AnyThreadChannel,
	VoiceState
} = require('discord.js');

const createIntefaceEmbed = (client) => {
	return new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Interfaz con calidad')
		.setAuthor({ name: 'Calidad Cyberpunk', iconURL: 'https://cdn.discordapp.com/emojis/771974836322959360.webp' })
		.setThumbnail(client.user.avatarURL())
		.addFields(
			{ name: ':lock: Bloquear', value: 'Bloquea tu canal para que no se metan más personas' },
			{ name: ':unlock: Desbloquear', value: 'Desbloquea tu canal para que se puedan meter más personas' },
			{ name: ':white_check_mark: Mostrar', value: 'Muestra tu canal a los demás' },
			{ name: ':negative_squared_cross_mark: Esconder', value: 'Esconde tu canal para que no se vea' },
		)
		.setFooter({ text: 'Bot hecho con calidad por Queso y Pan de piña', iconURL: 'https://cdn.discordapp.com/emojis/1001666667828486234.webp' });
};

const successGifs = [
	'https://c.tenor.com/q-KzBEHCXh0AAAAC/quby-like.gif',
	'https://c.tenor.com/RwGEitdlh1oAAAAS/vamo-jogar-free-fire.gif',
	'https://c.tenor.com/LKUn-5uzK4UAAAAC/megumin-anime.gif'
];

const createDMEmbed = (newState) => {
	const correct = successGifs[Math.floor(Math.random() * successGifs.length)];

	return new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Interfaz')
		.setAuthor({ name: 'Calidad Cyberpunk', iconURL: 'https://cdn.discordapp.com/emojis/771974836322959360.webp' })
		.setDescription(`Tu interfaz ha sido creada exitosamente ${newState.member.username}`)
		.setImage(correct)
		.setFooter({ text: 'Bot hecho con calidad por Queso y Pan de piña', iconURL: 'https://cdn.discordapp.com/emojis/1001666667828486234.webp' });
};

/**
 * @param {Client} client
 * @param {AnyThreadChannel} threadChannel
 * @param {VoiceState} newState
 * 
 */
const handleInterface = async (client, threadChannel, newState) => {

	// TODO CREATE INTERFACE
	threadChannel.send(`<@${newState.member.id}>`);

	let interfaceEmbed = createIntefaceEmbed(client);

	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('primary')
				.setLabel('Click me!')
				.setStyle(ButtonStyle.Primary),
		);

	threadChannel.send({ embeds: [interfaceEmbed], components: [row] });

	// TODO SEND MESSAGE TO THE OWNER OF THE CHANNEL
	let dmEmbed = createDMEmbed(newState);
	newState.member.send({ embeds: [dmEmbed] });

}

module.exports.handleInterface = handleInterface;