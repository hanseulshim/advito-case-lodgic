import { gql } from 'apollo-server-lambda'
import client from './client'
import currency from './currency'
import ingestionHotel from './ingestionHotel'
import unmatchedHotel from './unmatchedHotel'
import hotelProperty from './hotelProperty'

export default gql`
	directive @auth on FIELD_DEFINITION
	${client}
	${currency}
	${ingestionHotel}
	${unmatchedHotel}
	${hotelProperty}
	type Query {
		_empty: String
	}
	type Mutation {
		_empty: String
	}
`
