const yenv = require('yenv')

const env = yenv('../env.yml', {
	env: process.env.npm_config_argv.includes('staging') ? 'staging' : 'dev'
})

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: env.DB_HOST,
			user: env.DB_USER,
			password: env.DB_PASSWORD,
			database: env.DB_NAME
		},
		seeds: {
			directory: __dirname + '/seeds'
		}
	},
	staging: {
		client: 'pg',
		connection: {
			host: env.DB_HOST,
			user: env.DB_USER,
			password: env.DB_PASSWORD,
			database: env.DB_NAME
		},
		seeds: {
			directory: __dirname + '/seeds'
		}
	}
}
