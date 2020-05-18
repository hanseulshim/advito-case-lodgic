import client from './client'
import currency from './currency'
import hotelProperty from './hotelProperty'
import ingestionHotel from './ingestionHotel'
import unmatchedHotel from './unmatchedHotel'

export default {
	tabs: [
		client.Query,
		currency.Query,
		ingestionHotel.Query,
		ingestionHotel.Mutation,
		unmatchedHotel.Query,
		unmatchedHotel.Mutation,
		hotelProperty.Query
	]
}
