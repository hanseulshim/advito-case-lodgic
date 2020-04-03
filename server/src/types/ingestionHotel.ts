export type IngestionHotelType = {
	id: string
	jobIngestionId: string
	templateNote: string
	templateCategory: string
	sourceName: string
	loadedBy: () => string
	dataStartDate: string
	dataEndDate: string
	uploadTimestamp: string
	roomNightsTotal: string
	ingestedRoomSpend: () => number
	currencyIngested: string
	convertedRoomSpendUsd: () => number
	convertedAbrUsd: () => number
	conversionDate: () => string
	countRows: string
	unmatchedCount: string
	unmatchedCountPercent: () => number
	isDpm: Boolean
	statusDpm: String
	dateStatusDpm: String
	isSourcing: Boolean
	statusSourcing: String
	dateStatusSourcing: String
}
