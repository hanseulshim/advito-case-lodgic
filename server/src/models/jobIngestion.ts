import { Model } from 'objection'

export class JobIngestion extends Model {
	id: number
	isComplete: boolean
	jobStatus: string

	static tableName = 'job_ingestion'
}

export class JobIngestionHotel extends Model {
	jobIngestionId: number
	isDpm: boolean
	statusDpm: string
	dateStatusDpm: Date
	isSourcing: boolean
	statusSourcing: string
	dateStatusSourcing: Date
	ingestionNote: string

	static tableName = 'job_ingestion_hotel'
	static idColumn = 'jobIngestionId'
}

export class StageActivityHotel extends Model {
	id: number

	static tableName = 'stage_activity_hotel'
}

export class ActivityHotel extends Model {
	id: number

	static tableName = 'activity_hotel'
}

export class StageActivityHotelCandidate extends Model {
	static tableName = 'stage_activity_hotel_candidate'
}

export class HotelProjectProperty extends Model {
	id: number
	hotelProjectId: number
	hotelPropertyId: number
	agencyJobIngestionId: number
	ccJobIngestionId: number
	supplierJobIngestionId: number
	agencyDateCurrencyConversion: string
	agencyRoomNights: number
	agencySpendUsd: number
	ccDateCurrencyConversion: string
	ccRoomNights: number
	ccSpendUsd: number
	supplierDateCurrencyConversion: string
	supplierRoomNights: number
	supplierSpendUsd: number

	static tableName = 'hotel_project_property'
}

export class HotelProjectPropertyDay extends Model {
	static tableName = 'hotel_project_property_day'
}

export class HotelProject extends Model {
	clientId: number
	projectType: string
	projectStatus: string
	projectYear: number
	projectMonth: number
	static tableName = 'hotel_project'
}

export class ExportQc extends Model {
	id: number
	clientId: number
	exportType: string
	exportData: string
	dataStartDate: string
	dataEndDate: string
	static tableName = 'export_qc'
}
