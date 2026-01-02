import { existsSync } from "fs";

require("@dotenvx/dotenvx").config({
	path: ".env",
});

// The file names for the discord environment variables
const ENVFILE_DISCORD_TEST = ".env.quesito";
const ENVFILE_DISCORD_PROD = ".env.calidad";
const STAGE_CONFIG: Record<string, { ENVFILE_DISCORD: string }> = {
	dev: {
		ENVFILE_DISCORD: ENVFILE_DISCORD_TEST,
	},
	ci: {
		ENVFILE_DISCORD: ENVFILE_DISCORD_TEST,
	},
	prod: {
		ENVFILE_DISCORD: ENVFILE_DISCORD_PROD,
	},
};

const { STAGE = "dev", DOCKER_SECRETS_ENV_KEYS_PATH } = process.env;
const envfile_discord = `${STAGE_CONFIG[STAGE].ENVFILE_DISCORD}`;
const env_keys_path = DOCKER_SECRETS_ENV_KEYS_PATH ?? ".env.keys";

if (!existsSync(env_keys_path)) {
	throw new Error(
		`The file ${env_keys_path} does not exist. Please create it and add the keys.`
	);
}

require("@dotenvx/dotenvx").config({
	path: `${envfile_discord}`,
	envKeysFile: env_keys_path,
});

const mod_alias = require("module-alias");

mod_alias.addAlias("#root", __dirname + "/../");
mod_alias.addAlias("#src", __dirname);
mod_alias.addAlias("#tempVC", __dirname + "/functions/tempVoiceChannels");

process.on("uncaughtException", (error) => {
	console.error("Uncaught Exception:", error);
	process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection:", reason);
	process.exit(1);
});

const signalHandler: NodeJS.SignalsListener = (signal) => {
	console.error(`Received ${signal}`);
	process.exit(0);
};

process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);
