import gql from 'graphql-tag'

export const BACKOUT = gql`
	mutation backout($jobIngestionId: Int!) {
		backout(jobIngestionId: $jobIngestionId)
	}
`
