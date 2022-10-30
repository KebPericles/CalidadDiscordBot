const { Client, EmbedBuilder, BaseInteraction, ActionRowBuilder, ComponentType, ButtonBuilder, ButtonStyle, ButtonInteraction, CommandInteraction } = require("discord.js");
const { client } = require("../../bot");
const DiscordCollector = require("../../misc/classes/collector");
const DiscordComponent = require("../../misc/classes/component");
const DiscordUserInterface = require("../../misc/classes/ui");
const {
    getMemeTemplates
} = require("../../misc/memeGenerator/memeTemplateHandler");

const pageDensity = 5;

/**
 * 
 * @returns {EmbedBuilder}
 */
const createEmbed = () => {
    return new EmbedBuilder()
        .setColor(0x0099ff)
        .setAuthor({
            name: "Calidad Cyberpunk",
            iconURL:
                "https://cdn.discordapp.com/emojis/771974836322959360.webp",
        })
        //.setThumbnail(client.user.avatarURL())
        .setFooter({
            text: "Bot hecho con calidad por Queso y Pan de piña",
            iconURL:
                "https://cdn.discordapp.com/emojis/1001666667828486234.webp",
        });
};

/**
 * @param {Client} client
 * @param {BaseInteraction} interaction
 */
const embedPage = async (interaction) => {
    let page = interaction.page;
    let templates = await getMemeTemplates();
    let embed = createEmbed().setTitle("Lista de memes:");

    for (let i = 0; i < pageDensity; i++) {
        let template = templates[(page) * pageDensity + i];

        if (!template) {
            break;
        }

        embed.addFields({
            name: template.id,
            value: `${template.name}\nNúmero de líneas:${template.lines}\n${template.blank}\nEjemplo:${template.example.url}`,
        });
    }

    return embed;
};

/**
 * 
 * @param {ButtonInteraction} interaction 
 * @param {CommandInteraction} command 
 */
const collectEvent = async (interaction, command) => {
    let templates = await getMemeTemplates();
    this.selPage = this.selPage === undefined ? command.options._hoistedOptions[0].value - 1 : this.selPage;
    let pages = Math.ceil(templates.length / pageDensity);

    interaction.deferUpdate();

    this.selPage += interaction.customId == "next" ? 1 : -1;
    this.selPage = (this.selPage + pages) % pages;

    command.page = this.selPage;

    await interaction.message.edit({
        embeds: [await embedPage(command)],
        components: [(await actionRow()).getComponent()]
    });

};

const childComponents = [
    new DiscordComponent({
        component:
            new ButtonBuilder()
                .setCustomId("previous")
                .setEmoji("◀️")
                .setStyle(ButtonStyle.Secondary),
        componentType: ComponentType.Button,
        id: "previous",
        collect: collectEvent
    }),
    new DiscordComponent({
        component:
            new ButtonBuilder()
                .setCustomId("next")
                .setEmoji("▶️")
                .setStyle(ButtonStyle.Secondary),
        componentType: ComponentType.Button,
        id: "next",
        collect: collectEvent
    })
];

const actionRow = async () => {
    return new DiscordComponent({
        component: new ActionRowBuilder(),
        componentType: ComponentType.ActionRow,
        childComponents: childComponents,
        isRowComponent: true
    });
};

const collectors = [
    new DiscordCollector(ComponentType.Button, 60000)
];

module.exports = new DiscordUserInterface({
    embeds: [embedPage],
    components: [actionRow],
    collectorsToCreate: collectors
});