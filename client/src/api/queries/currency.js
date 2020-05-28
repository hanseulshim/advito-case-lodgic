import gql from 'graphql-tag'

export const CURRENCY_LIST = gql`
	{
		currencyList {
			id
			currencyName
			currencyCode
			currencySymbol
		}
	}
`
