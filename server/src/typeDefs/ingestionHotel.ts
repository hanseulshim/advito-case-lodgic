export default `
type IngestionHotel {
	recordCount: Int
	dpmCount: Int
	sourcingCount: Int
	data: [JobIngestionHotelView]
}
type JobIngestionHotelView {
  id: Int
  jobIngestionId: Int
	templateNote: String
	templateCategory: String
	jobName: String
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
	unmatchedCountPercent: Float
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
	approveFileList(
		clientId: Int!
		startDate: String!
		endDate: String!
		type: String!
	): [String] @auth
	checkLoadEnhancedQcReport(
		jobIngestionIds: [Int]!
		type: String!
	): Boolean @auth
	checkApproveFiles(
		clientId: Int!
		startDate: String!
		endDate: String!
		type: String!
	): Boolean @auth
	checkBackout(jobIngestionId: Int!): Boolean @auth
	checkExportActivityDataQc(clientId: Int!, dataStartDate: String!, dataEndDate: String!): String @auth
	checkExportEnhancedQC(clientId: Int!, dataStartDate: String!, dataEndDate: String!): String @auth
}

extend type Mutation {
	backout(jobIngestionId: Int!): Boolean @auth
	loadEnhancedQcReport(
		jobIngestionIds: [Int]!
		type: String!
		year: Int!
		month: Int
	): Boolean @auth
	approveFiles(clientId: Int!
		startDate: String!
		endDate: String!
		type: String!): Boolean @auth
	exportActivityDataQc(clientId: Int!, dataStartDate: String!, dataEndDate: String!, currencyType: String!): Boolean @auth
	exportEnhancedQC(clientId: Int!, dataStartDate: String!, dataEndDate: String!, currencyType: String!): Boolean @auth
}
`
