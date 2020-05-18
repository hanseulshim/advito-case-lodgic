export default `
type IngestionHotel {
	recordCount: Int
	data: [JobIngestionHotelView]
}
type JobIngestionHotelView {
  id: Int
  jobIngestionId: Int
	templateNote: String
	templateCategory: String
	sourceName: String
	loadedBy: String
	dataStartDate: String
	dataEndDate: String
	uploadTimestamp: String
	roomNightsTotal: Int
	ingestedRoomSpend: Float
	currencyIngested: String
	convertedRoomSpendUsd: Float
	convertedAbrUsd: Float
	conversionDate: String
	countRows: Int
	unmatchedCount: Int
	unmatchedSpendPercent: Float
	isDpm: Boolean
	statusDpm: String
	dateStatusDpm: String
	isSourcing: Boolean
	statusSourcing: String
	dateStatusSourcing: String
}

extend type Query {
  ingestionHotelList(
		clientId: Int!
		startDate: String!
		endDate: String!
		pageNumber: Int
	): IngestionHotel @auth
}

extend type Mutation {
	backout(jobIngestionId: Int!): Boolean @auth
}
`
