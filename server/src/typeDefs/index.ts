import { gql } from 'apollo-server-lambda'
import client from './client'
import ingestionHotel from './ingestionHotel'

export default gql`
	directive @auth on FIELD_DEFINITION
	${client}
	${ingestionHotel}
	type Query {
		_empty: String
	}
	type Mutation {
		_empty: String
	}
`
