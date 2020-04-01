import { getEndpoint } from '../utils'

export default {
	Query: {
		name: 'Client Query',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    {
			clientList {
				id
				clientName
			}
    }`
	}
}
