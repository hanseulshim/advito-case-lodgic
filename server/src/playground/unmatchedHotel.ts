import { getEndpoint } from '../utils'

export default {
	Query: {
		name: 'Unmatched Hotel Query',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    {
			unmatchedHotelList(
        clientId: 348
        startDate: "2020-01-01"
        endDate: "2020-12-31"
        pageNumber: null
        # sortType: ""
        # hotelName: ""
        # templateCategory: ""
        # sourceName: ""
        # cityName: ""
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
      
      # templateCategoryList(
      #   clientId: 348
      #   startDate: "2020-01-01"
      #   endDate: "2020-12-31"
      # )

      # sourceNameList(
      #   clientId: 348
      #   startDate: "2020-01-01"
      #   endDate: "2020-12-31"
      #   templateCategory: "Agency"
      # )

      # unmatchedHotelConfidenceList(stageActivityHotelId: null) {
      #   id
      #   stageActivityHotelId
      #   hotelPropertyId
      #   confidenceScore
      #   hotelName
      #   address1
      #   address2
      #   cityName
      #   stateCode
      #   countryName
      #   phoneNumber
      #   hotelChainName
      #   hotelBrandName
      #   lanyonId
      #   sabrePropertyId
      #   apolloPropertyId
      #   amadeusPropertyId
      #   worldspanPropertyId
      # }
    }`
	},
	Mutation: {
		name: 'Unmatched Hotel Mutation',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    mutation {
      matchHotel(stageActivityHotelId: null, hotelPropertyId: null)
    }`
	}
}
