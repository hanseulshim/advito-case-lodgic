import { Model } from 'objection'

export class StageActivityHotelView extends Model {
	id: string
	bestMatchScore: number
	roomSpend: number
	hotelName: string
	hotelChainName: string
	templateCategory: string
	sourceName: string
	numberOfNights: number
	uploadTimestamp: string
	address1: string
	address2: string
	cityName: string
	stateCode: string
	countryName: string
	phoneNumber: string
	count: string
	jobIngestionId: string
	jobStatus: string

	static tableName = 'v_stage_activity_hotel'
}
