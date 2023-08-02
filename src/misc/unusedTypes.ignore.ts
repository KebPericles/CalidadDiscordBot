import { ButtonInteraction, Awaitable, ComponentType, ComponentBuilder, ActionRowBuilder, CommandInteraction, Client, Message, InteractionCollector, MessageComponentInteraction, EmbedBuilder, BaseInteraction } from "discord.js";

export class DiscordComponent {
	/**
	 * 
	 * @param {DiscordComponent} dc 
	 */
	constructor({ component, childComponents, collect, componentType, dispose, id, ignore, isRowComponent = false }: DiscordComponent) {
		this.component = component;
		this.childComponents = childComponents;
		this.collect = collect;
		this.componentType = componentType;
		this.dispose = dispose;
		this.id = id;
		this.ignore = ignore;
		this.isRowComponent = isRowComponent;
	}

	getComponent = () => {
		if (!this.isRowComponent) return this.component;

		/**
		 * @type {ActionRowBuilder}
		 */
		let row: ActionRowBuilder = this.component;
		let childComps = [];
		this.childComponents.forEach(childComp => childComps.push(childComp.getComponent()));
		row.addComponents(childComps);
		return row;
	}

	isRowComponent: boolean = false;
	component: ComponentBuilder;
	childComponents: Array<DiscordComponent>;
	id: string = "";
	componentType: ComponentType;
	dispose: (interaction: ButtonInteraction, commandInteraction: CommandInteraction) => Awaitable<void> = (): Awaitable<void> => { };
	collect: (interaction: ButtonInteraction, commandInteraction: CommandInteraction) => Awaitable<void> = (): Awaitable<void> => { };
	ignore: (interaction: ButtonInteraction, commandInteraction: CommandInteraction) => Awaitable<void> = (): Awaitable<void> => { };
}

export class SelectMenuOption {
	constructor(label: string, value: string, description: string | undefined = undefined) {
		this.label = label;
		this.description = description;
		this.value = value;
	}

	label: string;
	description: string | undefined;
	value: string;
}

export class DiscordUserInterface {
	constructor(ui: DiscordUserInterface) {
		this.components = ui.components;
		this.embeds = ui.embeds;
		this.collectorsToCreate = ui.collectorsToCreate;
		this.ephemeral = ui.ephemeral;
	}

	sendInterface = async (interaction: CommandInteraction) => {
		let embeds = [];
		for (const embed of this.embeds) {
			embeds.push(await embed(interaction));
		}

		let comps = [];
		for (const component of this.components) {
			comps.push((await component()).getComponent())
		}

		await interaction.editReply({
			embeds: embeds,
			components: comps,
			ephemeral: this.ephemeral
		});
	};

	createCollectors = async (interaction: CommandInteraction) => {
		/**
		 * @type {Array<InteractionCollector>}
		 */
		let collectors: Array<InteractionCollector> = [];

		for (const collector of this.collectorsToCreate) {
			collectors.push((await interaction.fetchReply()).createMessageComponentCollector({
				componentType: collector.componentType,
				time: collector.time
			}));
		}

		// Search components for each collector
		collectors.forEach(async collector => {
			/**
			 * @type {Array<DiscordComponent>}
			 */
			let comps: Array<DiscordComponent> = [];

			// We search the components that are action rows
			let actionRowComps = this.components.filter(async component => {
				/**
				 * @type {DiscordComponent}
				 */
				let c: DiscordComponent = await component();
				if (c.componentType === ComponentType.ActionRow) return c.componentType === collector.componentType;
			});

			// We search in the components of the ActionRow and include them in the array if they meet the condition
			actionRowComps.forEach(async rowComp => {
				(await rowComp()).childComponents.filter(childComp => {
					return childComp.componentType === collector.componentType;
				}).forEach(comp => comps.push(comp));
			});

			// We add the components that are isolated
			for (const comp of this.components.filter(async component => (await component).componentType === collector.componentType)) {
				comps.push(await comp());
			}

			// Then we add the components to the collector
			collector.on("collect", async collectInt => await (comps.find(async (comp) => comp.id === collectInt.customId).collect)(collectInt, interaction));
			collector.on("ignore", async collectInt => await ((comps.find(async (comp) => comp.id === collectInt.customId)).ignore)(collectInt, interaction));
			collector.on("dispose", async collectInt => await ((comps.find(async (comp) => comp.id === collectInt.customId)).dispose)(collectInt, interaction));
		});

	}


	embeds: Array<Promise<EmbedBuilder>>;
	components: Array<Promise<DiscordComponent>>;
	collectorsToCreate: Array<DiscordCollector>;
	ephemeral: boolean = false;
}

export class UserInterface {
    constructor (ui: DiscordUserInterface, interaction: CommandInteraction){
        ui.sendInterface(interaction);
        ui.createCollectors(interaction);
    }
}