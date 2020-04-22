import { getEndpoint } from '../utils'

export default {
	Query: {
		name: 'Currency Query',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    {
			currencyList {
				id
        currencyName
        currencyCode
        currencySymbol
			}
    }`
	}
}
