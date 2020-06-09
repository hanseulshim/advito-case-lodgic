import gql from 'graphql-tag'

export const LOAD_ENHANCED_QC_REPORT = gql`
	mutation loadEnhancedQcReport(
		$jobIngestionIds: [Int]!
		$type: String!
		$year: Int!
		$month: Int
	) {
		loadEnhancedQcReport(
			jobIngestionIds: $jobIngestionIds
			type: $type
			year: $year
			month: $month
		)
	}
`

export const BACKOUT = gql`
	mutation backout($jobIngestionId: Int!) {
		backout(jobIngestionId: $jobIngestionId)
	}
`

export const EXPORT_ACTIVITY_DATA_QC = gql`
	mutation exportActivityDataQc(
		$currencyType: String!
		$clientId: Int!
		$dataStartDate: String!
		$dataEndDate: String!
	) {
		exportActivityDataQc(
			currencyType: $currencyType
			clientId: $clientId
			dataStartDate: $dataStartDate
			dataEndDate: $dataEndDate
		)
	}
`
