import { getEndpoint } from '../utils'

export default {
	Query: {
		name: 'Unmatched Hotel Query',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    {
			unmatchedHotelList(
        clientId: 1,
        startDate: "2020-01-01",
        endDate: "2020-12-31",
        pageNumber: null
      ) {
        pageCount
        data {
          id
          bestMatchScore
          roomSpend
          hotelName
          chainName
          templateCategory
          sourceName
          numberOfNights
          uploadTimestamp
          address1
          address2
          city
          state
          country
          phonePrimary
        }
			}
    }`
	}
}
