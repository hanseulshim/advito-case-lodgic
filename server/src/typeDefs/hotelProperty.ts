export default `
type HotelProperty {
	recordCount: Int
	data: [HotelPropertyView]
}

type HotelPropertyView {
	id: Int
	hotelName: String
	address1: String
	address2: String
	cityName: String
	stateCode: String
	countryName: String
	phoneNumber: String
	hotelChainName: String
	hotelBrandName: String
	lanyonId: String
	sabrePropertyId: String
	apolloPropertyId: String
	amadeusPropertyId: String
	worldspanPropertyId: String
}

extend type Query {
  hotelPropertyList(
		id: Int
		hotelName: String
    hotelChainName: String
    address1: String
    cityName: String
    stateCode: String
    countryName: String
    lanyonId: String
    sabrePropertyId: String
    apolloPropertyId: String
    amadeusPropertyId: String
    worldspanPropertyId: String
    pageNumber: Int
	): HotelProperty @auth
}
`
