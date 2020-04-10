import { Model } from 'objection'

export class UnmatchedHotelView extends Model {
	id: string
	bestMatchScore: number
	roomSpend: number
	hotelName: string
	chainName: string
	templateCategory: string
	sourceName: string
	numberOfNights: number
	uploadTimestamp: string
	addressLine1: string
	addressLine2: string
	cityName: string
	stateCode: string
	countryName: string
	phoneNumber: string
	count: string

	static tableName = 'v_stage_activity_hotel'
}
