import merge from 'lodash.merge'
import client from './client'
import currency from './currency'
import ingestionHotel from './ingestionHotel'
import unmatchedHotel from './unmatchedHotel'
import hotelProperty from './hotelProperty'

export default {
	...merge(client, currency, ingestionHotel, unmatchedHotel, hotelProperty)
}
