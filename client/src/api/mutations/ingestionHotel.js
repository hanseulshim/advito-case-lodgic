import gql from 'graphql-tag'

export const BACKOUT = gql`
	mutation backout($jobIngestionId: Int!) {
		backout(jobIngestionId: $jobIngestionId)
	}
`

export const EXPORT_ACTIVITY_DATA_QC = gql`
	mutation exportActivityDataQc($currencyType: String!) {
		exportActivityDataQc(currencyType: $currencyType)
	}
`
