export type JobIngestionHotelType = {
	recordCount: string
	dpmCount: string
	sourcingCount: string
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
	unmatchedCountPercent: () => number
	unmatchedSpendPercent: () => number
	isDpm: boolean
	statusDpm: string
	dateStatusDpm: string
	isSourcing: boolean
	statusSourcing: string
	dateStatusSourcing: string
	isComplete: boolean
	jobStatus: string
}
