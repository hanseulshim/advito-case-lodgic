import client from './client'
import currency from './currency'
import ingestionHotel from './ingestionHotel'
import unmatchedHotel from './unmatchedHotel'
import hotelProperty from './hotelProperty'

export default {
	tabs: [
		client.Query,
		currency.Query,
		ingestionHotel.Query,
		unmatchedHotel.Query,
		unmatchedHotel.Mutation,
		hotelProperty.Query
	]
}
