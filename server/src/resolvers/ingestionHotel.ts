import { JobIngestionHotelView } from '../models'
import { JobIngestionHotelType } from '../types'

export default {
	Query: {
		ingestionHotelList: async (
			_: null,
			{ clientId, startDate, endDate, pageNumber = 0 }
		): Promise<JobIngestionHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const [{ count }] = await JobIngestionHotelView.query()
				.count()
				.where('clientId', clientId)
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)

			return {
				pageCount: Math.ceil(+count / LIMIT),
				data: await JobIngestionHotelView.query()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.offset(OFFSET)
					.limit(LIMIT)
					.orderBy(['dataStartDate', 'templateCategory', 'sourceName'])
			}
		}
	}
}
