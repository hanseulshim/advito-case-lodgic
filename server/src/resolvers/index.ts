import merge from 'lodash.merge'
import client from './client'
import ingestionHotel from './ingestionHotel'
import unmatchedHotel from './unmatchedHotel'
import hotelProperty from './hotelProperty'

export default {
	...merge(client, ingestionHotel, unmatchedHotel, hotelProperty)
}
