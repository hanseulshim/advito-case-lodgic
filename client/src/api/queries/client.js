import gql from 'graphql-tag'

export const CLIENT_LIST = gql`
	{
		clientList {
			id
			clientName
		}
	}
`
