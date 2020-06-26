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
				unmatchedCountPercent
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

export const APPROVE_FILE_LIST = gql`
	query approvefileList(
		$clientId: Int!
		$startDate: String!
		$endDate: String!
		$type: String!
	) {
		approveFileList(
			clientId: $clientId
			startDate: $startDate
			endDate: $endDate
			type: $type
		)
	}
`

export const CHECK_LOAD_ENHANCED_QC_REPORT = gql`
	query checkLoadEnhancedQcReport($jobIngestionIds: [Int]!, $type: String!) {
		checkLoadEnhancedQcReport(jobIngestionIds: $jobIngestionIds, type: $type)
	}
`

export const CHECK_BACKOUT = gql`
	query checkBackout($jobIngestionId: Int!) {
		checkBackout(jobIngestionId: $jobIngestionId)
	}
`
