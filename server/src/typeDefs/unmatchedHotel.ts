export default `
type UnmatchedHotel {
	pageCount: Int
	data: [UnmatchedHotelView]
}
type UnmatchedHotelView {
	id: Int
	bestMatchScore: Float
	roomSpend: Float
	hotelName: String
	hotelChainName: String
	templateCategory: String
	sourceName: String
	numberOfNights: Int
	uploadTimestamp: String
	address1: String
	address2: String
	cityName: String
	stateCode: String
	countryName: String
	phoneNumber: String
	hotelBrandName: String
	sabrePropertyId: Int
	apolloPropertyId: Int
	amadeusPropertyId: Int
	worldspanPropertyId: Int
}

extend type Query {
  unmatchedHotelList(
		clientId: Int!
		startDate: String!
		endDate: String!
		pageNumber: Int
		sortType: String
		hotelName: String
		templateCategory: String
		sourceName: String
		cityName: String
	): UnmatchedHotel @auth
	unmatchedHotel(id: Int!): UnmatchedHotelView @auth
	templateCategoryList(
		clientId: Int!
		startDate: String!
		endDate: String!
	): [String] @auth

	sourceNameList(
		clientId: Int!
		startDate: String!
		endDate: String!
		templateCategory: String!
	): [String] @auth
}
`
