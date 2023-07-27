import { DiscordChannel } from "@tempVC/types";

declare global { 
	var createdChannels: Array<DiscordChannel>;
}

export {}