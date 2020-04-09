import client from './client'
import ingestionHotel from './ingestionHotel'
import unmatchedHotel from './unmatchedHotel'

export default {
	tabs: [client.Query, ingestionHotel.Query, unmatchedHotel.Query]
}
