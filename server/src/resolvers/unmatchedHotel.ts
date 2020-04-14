import { UnmatchedHotelView } from '../models'
import { UnmatchedHotelViewType, UnmatchedHotelType } from '../types'

export default {
	Query: {
		unmatchedHotelList: async (
			_: null,
			{
				clientId,
				startDate,
				endDate,
				pageNumber = 0,
				sortType,
				hotelName,
				templateCategory,
				sourceName,
				cityName
			}
		): Promise<UnmatchedHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const ORDER_BY = sortType ? sortType : 'roomSpend'
			const [
				{ count }
			] = await UnmatchedHotelView.query()
				.skipUndefined()
				.count()
				.where('clientId', clientId)
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.andWhere('hotelName', 'ILIKE', hotelName)
				.andWhere('templateCategory', templateCategory)
				.andWhere('sourceName', sourceName)
				.andWhere('cityName', 'ILIKE', cityName)

			return {
				pageCount: Math.ceil(+count / LIMIT),
				data: await UnmatchedHotelView.query()
					.skipUndefined()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('hotelName', 'ILIKE', hotelName)
					.andWhere('templateCategory', templateCategory)
					.andWhere('sourceName', sourceName)
					.andWhere('cityName', 'ILIKE', cityName)
					.offset(OFFSET)
					.limit(LIMIT)
					.orderBy(ORDER_BY, 'desc')
			}
		},
		unmatchedHotel: async (_: null, { id }): Promise<UnmatchedHotelViewType> =>
			UnmatchedHotelView.query().findById(id),
		templateCategoryList: async (
			_: null,
			{ clientId, startDate, endDate }
		): Promise<string[]> => {
			const result = await UnmatchedHotelView.query()
				.distinct('templateCategory')
				.where('clientId', clientId)
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.orderBy('templateCategory')
			return result.map((r) => r.templateCategory)
		},
		sourceNameList: async (
			_: null,
			{ clientId, startDate, endDate, templateCategory }
		): Promise<string[]> => {
			const result = await UnmatchedHotelView.query()
				.distinct('sourceName')
				.where('clientId', clientId)
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.andWhere('templateCategory', templateCategory)
				.orderBy('sourceName')
			return result.map((r) => r.sourceName)
		}
	}
}
