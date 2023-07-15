/** ------------------------- (ENGLISH)
 *      AUTHOR: KESOS & WILBREAD
 *      DATE: 14-07-2023
 *      DESCRIPTION:
 *       Application configuration file.
 */

module.exports = {
	apps: [{
		name: 'nodejs-bot',
		script: 'src/bot.js',
		instances: '1',
		exec_mode: 'cluster',
		watch: false,
		ignore_watch: ['node_modules', 'logs', 'public'],
		env: {
			NODE_ENV: process.env.ENV === 'prod' ? 'production' : 'development',
		},
		log_date_format: 'YYYY-MM-DD HH:mm',
		log_file: 'logs/combined.log',
		out_file: 'logs/out.log',
		pid_file: 'logs/pid.log',
		error_file: 'logs/err.log',
		merge_logs: false,
		max_memory_restart: '500M',
	}],
};