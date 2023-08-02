export interface MemeExample {
	text: Array<string>;
	url: string;
}

export interface MemeTemplate {
	id: string;
	name: string;
	lines: number;
	overlays: number;
	styles: Array<string>;
	blank: string;
	example: MemeExample;
	source: string;
	_self: string;
}