import { gql } from 'apollo-server-lambda'
import client from './client'

export default gql`
	directive @auth on FIELD_DEFINITION
	${client}
	type Query {
		_empty: String
	}
	type Mutation {
		_empty: String
	}
`
