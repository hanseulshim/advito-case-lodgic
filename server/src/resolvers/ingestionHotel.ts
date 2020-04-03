import { IngestionHotelView } from '../models'
import { IngestionHotelType } from '../types'

export default {
	Query: {
		ingestionHotelList: async (
			_: null,
			{ clientId, startDate, endDate }
		): Promise<IngestionHotelType[]> => {
			return IngestionHotelView.query()
				.where('clientId', clientId)
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
		}
	}
}
