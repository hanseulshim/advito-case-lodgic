import gql from 'graphql-tag'

export const UNMATCHED_HOTEL_LIST = gql`
	query unmatchedHotelList(
		$clientId: Int!
		$startDate: String!
		$endDate: String!
		$pageNumber: Int
		$sortType: String
		$hotelName: String
		$templateCategory: String
		$sourceName: String
		$cityName: String
	) {
		unmatchedHotelList(
			clientId: $clientId
			startDate: $startDate
			endDate: $endDate
			pageNumber: $pageNumber
			sortType: $sortType
			hotelName: $hotelName
			templateCategory: $templateCategory
			sourceName: $sourceName
			cityName: $cityName
		) {
			pageCount
			recordCount
			data {
				id
				bestMatchScore
				roomSpend
				hotelName
				hotelChainName
				templateCategory
				sourceName
				numberOfNights
				uploadTimestamp
				address1
				address2
				cityName
				stateCode
				countryName
				phoneNumber
				hotelBrandName
				sabrePropertyId
				apolloPropertyId
				amadeusPropertyId
				worldspanPropertyId
			}
		}
	}
`

export const UNMATCHED_HOTEL = gql`
	query unmatchedHotel(
		$currPosition: Int
		$clientId: Int!
		$startDate: String!
		$endDate: String!
		$sortType: String
		$hotelName: String
		$templateCategory: String
		$sourceName: String
		$cityName: String
	) {
		unmatchedHotel(
			currPosition: $currPosition
			clientId: $clientId
			startDate: $startDate
			endDate: $endDate
			sortType: $sortType
			hotelName: $hotelName
			templateCategory: $templateCategory
			sourceName: $sourceName
			cityName: $cityName
		) {
			recordCount
			prevId
			currPosition
			nextId
			data {
				id
				bestMatchScore
				roomSpend
				hotelName
				hotelChainName
				templateCategory
				sourceName
				numberOfNights
				uploadTimestamp
				address1
				address2
				cityName
				stateCode
				countryName
				phoneNumber
				hotelBrandName
				sabrePropertyId
				apolloPropertyId
				amadeusPropertyId
				worldspanPropertyId
				lanyonId
			}
		}
	}
`

export const TEMPLATE_CATEGORY_LIST = gql`
	query templateCategoryList(
		$clientId: Int!
		$startDate: String!
		$endDate: String!
	) {
		templateCategoryList(
			clientId: $clientId
			startDate: $startDate
			endDate: $endDate
		)
	}
`

export const SOURCE_NAME_LIST = gql`
	query sourceNameList(
		$clientId: Int!
		$startDate: String!
		$endDate: String!
		$templateCategory: String!
	) {
		sourceNameList(
			clientId: $clientId
			startDate: $startDate
			endDate: $endDate
			templateCategory: $templateCategory
		)
	}
`

export const UNMATCHED_HOTEL_CONFIDENCE_LIST = gql`
	query unmatchedHotelConfidenceList($stageActivityHotelId: Int!) {
		unmatchedHotelConfidenceList(stageActivityHotelId: $stageActivityHotelId) {
			id
			stageActivityHotelId
			hotelPropertyId
			confidenceScore
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
`
