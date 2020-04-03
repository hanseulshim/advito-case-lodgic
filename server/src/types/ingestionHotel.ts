export type IngestionHotelType = {
	pageCount: number
	data: IngestionHotelView[]
}

type IngestionHotelView = {
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
	isDpm: boolean
	statusDpm: string
	dateStatusDpm: string
	isSourcing: boolean
	statusSourcing: string
	dateStatusSourcing: string
}
