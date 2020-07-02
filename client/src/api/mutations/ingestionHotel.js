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
		$jobIngestionIds: [Int]!
	) {
		exportActivityDataQc(
			currencyType: $currencyType
			jobIngestionIds: $jobIngestionIds
		)
	}
`

export const EXPORT_ENHANCED_QC = gql`
	mutation exportEnhancedQC(
		$currencyType: String!
		$clientId: Int!
		$dataStartDate: String!
		$dataEndDate: String!
	) {
		exportEnhancedQC(
			currencyType: $currencyType
			clientId: $clientId
			dataStartDate: $dataStartDate
			dataEndDate: $dataEndDate
		)
	}
`

export const APPROVE_FILES = gql`
	mutation approveFiles(
		$clientId: Int!
		$startDate: String!
		$endDate: String!
		$type: String!
	) {
		approveFiles(
			clientId: $clientId
			startDate: $startDate
			endDate: $endDate
			type: $type
		)
	}
`
