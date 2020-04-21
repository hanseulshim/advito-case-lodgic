import client from './client'
import ingestionHotel from './ingestionHotel'
import unmatchedHotel from './unmatchedHotel'
import hotelProperty from './hotelProperty'

export default {
	tabs: [
		client.Query,
		ingestionHotel.Query,
		unmatchedHotel.Query,
		unmatchedHotel.Mutation,
		hotelProperty.Query
	]
}
