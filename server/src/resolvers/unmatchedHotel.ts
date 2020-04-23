import {
	StageActivityHotelView,
	StageActivityHotelCandidateView
} from '../models'
import {
	StageActivityHotelViewType,
	StageActivityHotelType,
	StageActivityHotelCandidateViewType
} from '../types'

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
				sortOrder,
				hotelName,
				templateCategory,
				sourceName,
				cityName
			}
		): Promise<StageActivityHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const ORDER_BY = sortType ? sortType : 'roomSpend'
			const SORT_ORDER =
				sortOrder && sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC'
			const [{ count }] = await StageActivityHotelView.query()
				.skipUndefined()
				.count()
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.andWhere('hotelName', 'ILIKE', `%${hotelName || ''}%`)
				.andWhere('templateCategory', templateCategory)
				.andWhere('sourceName', sourceName)
				.andWhere('cityName', 'ILIKE', `%${cityName || ''}%`)

			return {
				pageCount: Math.ceil(+count / LIMIT),
				recordCount: +count,
				data: await StageActivityHotelView.query()
					.skipUndefined()
					.where('clientId', clientId)
					.whereNull('matchedHotelPropertyId')
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('hotelName', 'ILIKE', `%${hotelName || ''}%`)
					.andWhere('templateCategory', templateCategory)
					.andWhere('sourceName', sourceName)
					.andWhere('cityName', 'ILIKE', `%${cityName || ''}%`)
					.offset(OFFSET)
					.limit(LIMIT)
					.orderBy(ORDER_BY, SORT_ORDER)
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
		},
		unmatchedHotelConfidenceList: async (
			_: null,
			{ stageActivityHotelId },
			{ hotel }
		): Promise<StageActivityHotelCandidateViewType[]> =>
			StageActivityHotelCandidateView.query(hotel)
				.where('stageActivityHotelId', stageActivityHotelId)
				.orderBy('confidenceScore', 'DESC')
	},
	Mutation: {
		matchHotel: async (
			_: null,
			{ stageActivityHotelId, hotelPropertyId },
			{ advito }
		): Promise<null> => {
			const { rows } = await advito.raw(
				`select manual_match(${stageActivityHotelId}, ${hotelPropertyId})`
			)
			const [{ manual_match: result }] = rows
			return result
		}
	}
}
