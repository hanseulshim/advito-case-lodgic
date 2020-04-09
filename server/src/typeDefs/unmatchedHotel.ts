export default `
type UnmatchedHotel {
	pageCount: Int
	data: [UnmatchedHotelView]
}
type UnmatchedHotelView {
	id: String
	bestMatchScore: Float
	roomSpend: Float
	hotelName: String
	chainName: String
	templateCategory: String
	sourceName: String
	numberOfNights: Int
	uploadTimestamp: String
	address1: String
	address2: String
	city: String
	state: String
	country: String
	phonePrimary: String
}

extend type Query {
  unmatchedHotelList(
		clientId: Int!
		startDate: String!
		endDate: String!
		pageNumber: Int
	): UnmatchedHotel @auth
}
`
