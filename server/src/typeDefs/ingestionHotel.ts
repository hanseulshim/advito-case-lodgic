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
type ActivityDataQc {
	jobIngestionId: Int
	matchedHotelPropertyId: Int
	matchedHotelPropertyAliasId: Int
	lanyonId: Int
	propertyName: String
	address1: String
	address2: String
	city: String
	state: String
	countryCode: String
	countryName: String
	chainCode: String
	chainName: String
	brandName: String
	marketTierCode: String
	marketTierLabel: String
	serviceLevel: String
	agencyNights: String
	agencySpend: String
	supplierNights: String
	supperSpend: String
	cardSpendTotal: String
	cardSpend80: String
	sourceName: String
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
	exportActivityDataQc(jobIngestionId: Int!, currencyType: String!): String @auth
}
`
