import { getEndpoint } from '../utils'

export default {
	Query: {
		name: 'Hotel Property List',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    {
      hotelPropertyList
      # (
        # id: ""
        # hotelName: ""
        # hotelChainName: ""
        # address1: ""
        # cityName: ""
        # stateCode: ""
        # countryName: ""
        # lanyonId: ""
        # sabrePropertyId: ""
        # apolloPropertyId: ""
        # amadeusPropertyId: ""
        # worldspanPropertyId: ""
        # pageNumber: 0
      # ) 
      {
        recordCount
        data {
          id
          hotelName
          address1
          address2
          cityName
          stateCode
          countryName
          phoneNumber
          hotelChainName
          hotelBrandName
          lanyonId
          sabrePropertyId
          apolloPropertyId
          amadeusPropertyId
          worldspanPropertyId
        }
			}
    }`
	}
}
