import merge from 'lodash.merge'
import client from './client'
import ingestionHotel from './ingestionHotel'
import unmatchedHotel from './unmatchedHotel'

export default {
	...merge(client, ingestionHotel, unmatchedHotel)
}
