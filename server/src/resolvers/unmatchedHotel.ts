import { UnmatchedHotelView } from '../models'
import { UnmatchedHotelViewType, UnmatchedHotelType } from '../types'

export default {
	Query: {
		unmatchedHotelList: async (
			_: null,
			{ clientId, startDate, endDate, pageNumber = 0 }
		): Promise<UnmatchedHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const [{ count }] = await UnmatchedHotelView.query()
				.count()
				.where('clientId', clientId)
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)

			return {
				pageCount: Math.ceil(+count / LIMIT),
				data: await UnmatchedHotelView.query()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.offset(OFFSET)
					.limit(LIMIT)
					.orderBy('uploadTimestamp', 'desc')
			}
		},
		unmatchedHotel: async (_: null, { id }): Promise<UnmatchedHotelViewType> =>
			UnmatchedHotelView.query().findById(id)
	}
}
