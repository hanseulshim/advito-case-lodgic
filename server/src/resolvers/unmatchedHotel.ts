import { StageActivityHotelView } from '../models'
import { StageActivityHotelViewType, StageActivityHotelType } from '../types'

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
		): Promise<StageActivityHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const ORDER_BY = sortType ? sortType : 'roomSpend'
			const [
				{ count }
			] = await StageActivityHotelView.query()
				.skipUndefined()
				.count()
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.andWhere('hotelName', 'ILIKE', hotelName)
				.andWhere('templateCategory', templateCategory)
				.andWhere('sourceName', sourceName)
				.andWhere('cityName', 'ILIKE', cityName)

			return {
				pageCount: Math.ceil(+count / LIMIT),
				data: await StageActivityHotelView.query()
					.skipUndefined()
					.where('clientId', clientId)
					.whereNull('matchedHotelPropertyId')
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
		unmatchedHotel: async (
			_: null,
			{ id }
		): Promise<StageActivityHotelViewType> =>
			StageActivityHotelView.query().findById(id),
		templateCategoryList: async (
			_: null,
			{ clientId, startDate, endDate }
		): Promise<string[]> => {
			const result = await StageActivityHotelView.query()
				.distinct('templateCategory')
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.orderBy('templateCategory')
			return result.map((r) => r.templateCategory)
		},
		sourceNameList: async (
			_: null,
			{ clientId, startDate, endDate, templateCategory }
		): Promise<string[]> => {
			const result = await StageActivityHotelView.query()
				.distinct('sourceName')
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.andWhere('templateCategory', templateCategory)
				.orderBy('sourceName')
			return result.map((r) => r.sourceName)
		}
	}
}
