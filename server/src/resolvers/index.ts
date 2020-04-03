import merge from 'lodash.merge'
import client from './client'
import ingestionHotel from './ingestionHotel'

export default {
	...merge(client, ingestionHotel)
}
