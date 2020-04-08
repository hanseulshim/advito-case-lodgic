import { IngestionHotelView } from '../models'
import { IngestionHotelType } from '../types'

export default {
	Query: {
		ingestionHotelList: async (
			_: null,
			{ clientId, startDate, endDate, pageNumber = 0 }
		): Promise<IngestionHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const [{ count }] = await IngestionHotelView.query()
				.count()
				.where('clientId', clientId)
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)

			return {
				pageCount: Math.ceil(+count / LIMIT),
				data: await IngestionHotelView.query()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.offset(OFFSET)
					.limit(LIMIT)
					.orderBy('id')
			}
		}
	}
}
