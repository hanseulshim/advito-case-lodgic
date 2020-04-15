import { Model } from 'objection'

export class StageActivityHotelCandidateView extends Model {
	id: number
	stageActivityHotelId: number
	hotelPropertyId: number
	confidenceScore: number
	hotelName: string
	address1: string
	address2: string
	cityName: string
	stateCode: string
	countryName: string
	phoneNumber: string
	hotelChainName: string
	hotelBrandName: string
	lanyonId: number
	sabrePropertyId: number
	apolloPropertyId: number
	amadeusPropertyId: number
	worldspanPropertyId: number

	static tableName = 'v_stage_activity_hotel_candidate'
}
