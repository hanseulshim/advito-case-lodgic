import { ApolloServer } from 'apollo-server-lambda'
import Knex from 'knex'
import moment from 'moment'
import { knexSnakeCaseMappers, Model } from 'objection'
import pg from 'pg'
import 'source-map-support/register'
import RequireAuthDirective from './src/authDirective'
import playground from './src/playground'
import resolvers from './src/resolvers'
import typeDefs from './src/typeDefs'
import { ContextType } from './src/types'
import { authenticateUser } from './src/utils'
const pgToString = (value): string => {
	return moment(value).format()
}
pg.types.setTypeParser(1082, pgToString) // date
pg.types.setTypeParser(1083, pgToString) // time
pg.types.setTypeParser(1114, pgToString) // timestamp
pg.types.setTypeParser(1184, pgToString) // timestamptz
pg.types.setTypeParser(1266, pgToString) // timetz

const advito = Knex({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	},
	...knexSnakeCaseMappers()
})

const hotel = Knex({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: 'hotel'
	},
	...knexSnakeCaseMappers()
})
Model.knex(advito)

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground,
	context: async ({ event }): Promise<ContextType> => {
		const sessionToken = event.headers.Authorization || ''
		const user = await authenticateUser(sessionToken)
		return { user, advito, hotel }
	},
	schemaDirectives: {
		auth: RequireAuthDirective
	}
})

export const graphqlHandler = server.createHandler({
	cors: {
		origin: true,
		credentials: true
	}
})
