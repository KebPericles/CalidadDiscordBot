import { Collection, EmbedBuilder } from 'discord.js';
import { DiscordCommand } from '#src/types';

// Mock global variables
global.commands = new Collection<string, DiscordCommand>();
global.createdChannels = [];
global.defaultEmbed = () => new EmbedBuilder()
  .setColor(0x0099ff)
  .setAuthor({
    name: "Manchas Cyberpunk",
    iconURL: "https://cdn.discordapp.com/emojis/771974836322959360.webp",
  })
  .setFooter({
    text: "Bot hecho con calidad por Pan con Queso",
    iconURL: "https://cdn.discordapp.com/emojis/1001666667828486234.webp",
  });

// Mock environment variables
process.env.BOT_TOKEN = 'test-token';
process.env.CLIENT_ID = 'test-client-id';
process.env.GUILD_ID = 'test-guild-id';
process.env.ENV = 'test';
