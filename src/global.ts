// Export global variables
//https://www.reddit.com/r/typescript/comments/1hbqw0n/what_is_globaldts_file_in_typescript_how_do_you/

import {
	Collection,
	RESTPostAPIChatInputApplicationCommandsJSONBody as CommandsJSONBody,
} from "discord.js";
import { DiscordChannel } from "./functions/tempVoiceChannels/types";
import { DiscordCommand } from "./types";

let commands = new Collection<string, DiscordCommand>();
let createdChannels: DiscordChannel[] = [];
let commandArray: Array<CommandsJSONBody> = [];

export { commands, createdChannels, commandArray };
