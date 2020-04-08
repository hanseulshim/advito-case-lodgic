import { Model } from 'objection'
import moment from 'moment'

export class IngestionHotelView extends Model {
	id: string
	jobIngestionId: string
	templateNote: string
	templateCategory: string
	sourceName: string
	dataStartDate: string
	dataEndDate: string
	uploadTimestamp: string
	roomNightsTotal: string
	currencyIngested: string
	countRows: string
	unmatchedCount: string
	nameFirst: string
	nameLast: string
	unmatchedSpend: string
	matchedSpend: string
	unmatchedSpendUsd: string
	matchedSpendUsd: string
	isDpm: boolean
	statusDpm: string
	dateStatusDpm: string
	isSourcing: boolean
	statusSourcing: string
	dateStatusSourcing: string
	count: string

	static tableName = 'v_job_ingestion_hotel'

	loadedBy(): string {
		return `${this.nameLast}, ${this.nameFirst}`
	}

	ingestedRoomSpend(): number {
		return +this.unmatchedSpend + +this.matchedSpend
	}

	convertedRoomSpendUsd(): number {
		return +this.unmatchedSpendUsd + +this.matchedSpendUsd
	}

	conversionDate(): string {
		const startDate = moment(this.dataStartDate)
		const endDate = moment(this.dataEndDate)
		const inBetween = (startDate.valueOf() + endDate.valueOf()) / 2
		return inBetween.toString()
	}

	unmatchedCountPercent(): number {
		return +this.countRows ? +this.unmatchedCount / +this.countRows : 0
	}

	convertedAbrUsd(): number {
		return +this.roomNightsTotal
			? (+this.unmatchedSpendUsd + +this.matchedSpendUsd) /
					+this.roomNightsTotal
			: 0
	}
}
