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
	address1: string
	address2: string
	city: string
	state: string
	country: string
	phonePrimary: string
	count: string

	static tableName = 'v_stage_activity_hotel'
}
