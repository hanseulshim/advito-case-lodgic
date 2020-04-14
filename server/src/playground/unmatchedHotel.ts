import { getEndpoint } from '../utils'

export default {
	Query: {
		name: 'Unmatched Hotel Query',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    {
			unmatchedHotelList(
        clientId: 348,
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
          hotelChainName
          templateCategory
          sourceName
          numberOfNights
          uploadTimestamp
          address1
          address2
          cityName
          stateCode
          countryName
          phoneNumber
          hotelBrandName
          sabrePropertyId
          apolloPropertyId
          amadeusPropertyId
          worldspanPropertyId
        }
      }
      # unmatchedHotel(id: null) {
      #   id
      #   bestMatchScore
      #   roomSpend
      #   hotelName
      #   hotelChainName
      #   templateCategory
      #   sourceName
      #   numberOfNights
      #   uploadTimestamp
      #   address1
      #   address2
      #   cityName
      #   stateCode
      #   countryName
      #   phoneNumber
      #   hotelBrandName
      #   sabrePropertyId
      #   apolloPropertyId
      #   amadeusPropertyId
      #   worldspanPropertyId
      # }
      
      # sourceTypeList(
      #   clientId: 348,
      #   startDate: "2020-01-01",
      #   endDate: "2020-12-31"
      # )

      # sourceNameList(
      #   clientId: 348,
      #   startDate: "2020-01-01",
      #   endDate: "2020-12-31"
      # )
    }`
	}
}
