/*
Interaction.reply(
	components: new DiscordUIBuilder()
		.addTitle("Chalala")
		.addRow(row => {
			row.addButton()
				.setEmoji("a")
				.setId("arriba");
			row.addButton()
				.setEmoji("b")
				.setId("abajo");
		})
		.addRow(row => {
			row.addDropdown()
				.addOption("Si")
				.addOption("No");
		})
)
*/

import { APIBaseComponent, ActionRowBuilder, AnyAPIActionRowComponent, AnyComponentBuilder, BitFieldResolvable, ButtonBuilder, ComponentBuilder, ComponentType, EmbedBuilder, InteractionReplyOptions, MessageFlags, MessageMentionOptions } from "discord.js";

/*
export class DiscordComponent {
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

		let row: ActionRowBuilder = this.component;
		let childComps = [];
		this.childComponents.forEach(childComp => childComps.push(childComp.getComponent()));
		row.addComponents(childComps);
		return row;
	}

	id: string = "";
	isRowComponent: boolean = false;
	component: ComponentBuilder;
	childComponents: Array<DiscordComponent>;
	componentType: ComponentType;
	dispose: (interaction: ButtonInteraction, commandInteraction: CommandInteraction) => Awaitable<void> = (): Awaitable<void> => { };
	collect: (interaction: ButtonInteraction, commandInteraction: CommandInteraction) => Awaitable<void> = (): Awaitable<void> => { };
	ignore: (interaction: ButtonInteraction, commandInteraction: CommandInteraction) => Awaitable<void> = (): Awaitable<void> => { };
}
export interface DiscordUI {
	
}
*/

export class DiscordComponent {
}

/**
 * This class manages the buttons that are gonna be added to the
 * ui. These buttons will be holded in an ActionRowBuilder.
 * 
 * The ui will only be accepting buttons for simplicity and any
 * other type of data needed must be requested on a modal.
 */
export class UIRowBuilder {
	private _components: DiscordComponent[];

	constructor() {
		this._components = [];
	}

	get components() {
		return this._components;
	}

	public addButton(){

		
	}
}

export class DiscordUIBuilder implements InteractionReplyOptions {

	private _embed: EmbedBuilder;
	private _components: Array<ActionRowBuilder>;

	public allowedMentions?: MessageMentionOptions | undefined;
	//public components?: (APIActionRowComponent<APIMessageActionRowComponent> | JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>> | ActionRowData<...>)[] | undefined;
	public content?: string | undefined;
	public fetchReply?: boolean | undefined;

	public constructor(embed?: EmbedBuilder) {
		this._embed = embed || defaultEmbed();
		this._components = [];
	}

	public get embeds() {
		return [this._embed];
	}

	public get ephemeral() {
		return false;
	}

	public addRow(callback: (row: DiscordRowBuilder) => DiscordRowBuilder) {
		let rowWithComponents = callback(new DiscordRowBuilder());
		this._components.push(new ActionRowBuilder().setComponents(rowWithComponents.components))
	}
}

const hola = new DiscordUIBuilder().addRow((row) =>
	row.
)