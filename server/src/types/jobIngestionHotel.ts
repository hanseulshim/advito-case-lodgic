export type JobIngestionHotelType = {
	recordCount: number
	data: JobIngestionHotelView[]
}

type JobIngestionHotelView = {
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
	unmatchedSpendPercent: () => number
	isDpm: boolean
	statusDpm: string
	dateStatusDpm: string
	isSourcing: boolean
	statusSourcing: string
	dateStatusSourcing: string
}
