import moment from 'moment'
import { Model } from 'objection'

export class JobIngestionHotelView extends Model {
	id: string
	jobIngestionId: string
	templateNote: string
	templateCategory: string
	sourceName: string
	jobName: string
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
	isComplete: boolean
	jobStatus: string
	clientId: string

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

	unmatchedSpendPercent(): number {
		return +this.unmatchedSpendUsd + +this.matchedSpendUsd
			? +this.unmatchedSpendUsd /
					(+this.unmatchedSpendUsd + +this.matchedSpendUsd)
			: 0
	}

	convertedAbrUsd(): number {
		return +this.roomNightsTotal
			? (+this.unmatchedSpendUsd + +this.matchedSpendUsd) /
					+this.roomNightsTotal
			: 0
	}
}
