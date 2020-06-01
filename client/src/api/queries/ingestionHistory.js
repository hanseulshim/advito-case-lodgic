import gql from 'graphql-tag'

export const INGESTION_HOTEL_LIST = gql`
	query ingestionHotelList(
		$clientId: Int!
		$startDate: String!
		$endDate: String!
		$pageNumber: Int
	) {
		ingestionHotelList(
			clientId: $clientId
			startDate: $startDate
			endDate: $endDate
			pageNumber: $pageNumber
		) {
			recordCount
			data {
				id
				jobIngestionId
				templateNote
				templateCategory
				sourceName
				loadedBy
				dataStartDate
				dataEndDate
				uploadTimestamp
				roomNightsTotal
				ingestedRoomSpend
				currencyIngested
				convertedRoomSpendUsd
				convertedAbrUsd
				conversionDate
				countRows
				unmatchedCount
				unmatchedSpendPercent
				isDpm
				statusDpm
				dateStatusDpm
				isSourcing
				statusSourcing
				dateStatusSourcing
				jobName
			}
		}
	}
`
