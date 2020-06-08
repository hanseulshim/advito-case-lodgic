import { Model } from 'objection'

export class StageActivityHotelCandidateView extends Model {
	id: number
	stageActivityHotelId: number
	hotelPropertyId: number
	confidenceScore: number
	matchScore: number
	hotelName: string
	address1: string
	address2: string
	cityName: string
	stateCode: string
	countryName: string
	phoneNumber: string
	hotelChainName: string
	hotelBrandName: string
	lanyonId: string
	sabrePropertyId: string
	apolloPropertyId: string
	amadeusPropertyId: string
	worldspanPropertyId: string

	static tableName = 'v_stage_activity_hotel_candidate'
}
