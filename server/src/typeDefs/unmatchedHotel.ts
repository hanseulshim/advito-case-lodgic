export default `
type UnmatchedHotel {
	pageCount: Int
	data: [StageActivityHotelView]
}
type StageActivityHotelView {
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

type StageActivityHotelCandidateView {
	id: Int
	stageActivityHotelId: Int
	hotelPropertyId: Int
	confidenceScore: Float
	hotelName: String
	address1: String
	address2: String
	cityName: String
	stateCode: String
	countryName: String
	phoneNumber: String
	hotelChainName: String
	hotelBrandName: String
	lanyonId: Int
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
	unmatchedHotel(id: Int!): StageActivityHotelView @auth
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

	unmatchedHotelConfidenceList(stageActivityHotelId: Int!): [StageActivityHotelCandidateView] @auth
}
`
