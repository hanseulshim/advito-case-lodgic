import { getEndpoint } from '../utils'

export default {
	Query: {
		name: 'Unmatched Hotel Query',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    {
			unmatchedHotelList(
        clientId: 41,
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
          addressLine1
          addressLine2
          cityName
          stateCode
          countryName
          phoneNumber
        }
			}
    }`
	}
}
