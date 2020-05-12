import gql from 'graphql-tag'

export const HOTEL_PROPERTY_LIST = gql`
	query hotelPropertyList(
		$id: Int
		$hotelName: String
		$hotelChainName: String
		$address1: String
		$cityName: String
		$stateCode: String
		$countryName: String
		$lanyonId: String
		$sabrePropertyId: String
		$apolloPropertyId: String
		$amadeusPropertyId: String
		$worldspanPropertyId: String
		$pageNumber: Int
	) {
		hotelPropertyList(
			id: $id
			hotelName: $hotelName
			hotelChainName: $hotelChainName
			address1: $address1
			cityName: $cityName
			stateCode: $stateCode
			countryName: $countryName
			lanyonId: $lanyonId
			sabrePropertyId: $sabrePropertyId
			apolloPropertyId: $apolloPropertyId
			amadeusPropertyId: $amadeusPropertyId
			worldspanPropertyId: $worldspanPropertyId
			pageNumber: $pageNumber
		) {
			recordCount
			data {
				id
				hotelName
				address1
				address2
				cityName
				stateCode
				countryName
				phoneNumber
				hotelChainName
				hotelBrandName
				lanyonId
				sabrePropertyId
				apolloPropertyId
				amadeusPropertyId
				worldspanPropertyId
			}
		}
	}
`
