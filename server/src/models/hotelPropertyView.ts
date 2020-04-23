import { Model } from 'objection'

export class HotelPropertyView extends Model {
	id: number
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
	count: number

	static tableName = 'v_hotel_property'
}
