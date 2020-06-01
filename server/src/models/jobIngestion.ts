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

	static tableName = 'hotel_project_property'
}

export class HotelProject extends Model {
	static tableName = 'hotel_project'
}
