import 'source-map-support/register'
import { ApolloServer } from 'apollo-server-lambda'
import typeDefs from './src/typeDefs'
import resolvers from './src/resolvers'
import playground from './src/playground'
import Knex from 'knex'
import { ContextType } from './src/types'
import { Model, knexSnakeCaseMappers } from 'objection'
import { authenticateUser } from './src/utils'
import RequireAuthDirective from './src/authDirective'

Model.knex(
	Knex({
		client: 'pg',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME
		},
		...knexSnakeCaseMappers()
	})
)

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground,
	context: async ({ event }): Promise<ContextType> => {
		const sessionToken = event.headers.Authorization || ''
		const user = await authenticateUser(sessionToken)
		return { user }
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
