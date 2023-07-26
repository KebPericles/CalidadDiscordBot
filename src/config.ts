require('dotenv').config('../.env');
const mod_alias = require('module-alias');

mod_alias.addAlias('@root', __dirname + '/../');
mod_alias.addAlias('@src', __dirname);

process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection:', reason);
	process.exit(1);
});

const signalHandler: NodeJS.SignalsListener = (signal) => {
	console.error(`Received ${signal}`);
	process.exit(0);
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);