import { DiscordEvent } from "@src/types";
import { Client, Events } from "discord.js";

const event: DiscordEvent = {
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        console.log(`Ready!! ${client.user?.tag} is logged in and online.`);
    }
}

export default event;