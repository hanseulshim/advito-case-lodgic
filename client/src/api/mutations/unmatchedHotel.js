import gql from 'graphql-tag'

export const MATCH_HOTEL = gql`
	mutation matchHotel($stageActivityHotelId: Int!, $hotelPropertyId: Int!) {
		matchHotel(
			stageActivityHotelId: $stageActivityHotelId
			hotelPropertyId: $hotelPropertyId
		)
	}
`
