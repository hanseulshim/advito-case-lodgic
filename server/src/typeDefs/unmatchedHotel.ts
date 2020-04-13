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
	chainName: String
	templateCategory: String
	sourceName: String
	numberOfNights: Int
	uploadTimestamp: String
	addressLine1: String
	addressLine2: String
	cityName: String
	stateCode: String
	countryName: String
	phoneNumber: String
	brandName: String
	sabreId: Int
	apolloId: Int
	amadeusId: Int
	worldspanId: Int
}

extend type Query {
  unmatchedHotelList(
		clientId: Int!
		startDate: String!
		endDate: String!
		pageNumber: Int
	): UnmatchedHotel @auth
	unmatchedHotel(id: Int!): UnmatchedHotelView @auth
}
`
