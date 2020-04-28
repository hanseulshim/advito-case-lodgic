import {
	StageActivityHotelView,
	StageActivityHotelCandidateView
} from '../models'
import {
	StageActivityHotelSingleType,
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
				sortType = '',
				hotelName,
				templateCategory,
				sourceName,
				cityName
			}
		): Promise<StageActivityHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const ORDER_BY = sortType.toLowerCase().includes('match')
				? 'bestMatchScore'
				: 'roomSpend'
			const SORT_ORDER = sortType.toLowerCase().includes('asc') ? 'ASC' : 'DESC'
			const { count } = await StageActivityHotelView.query()
				.skipUndefined()
				.count()
				.first()
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
					.orderBy('id')
			}
		},
		unmatchedHotel: async (
			_: null,
			{
				id = null,
				clientId,
				startDate,
				endDate,
				sortType = '',
				hotelName,
				templateCategory,
				sourceName,
				cityName
			}
		): Promise<StageActivityHotelSingleType> => {
			const ORDER_BY = sortType.toLowerCase().includes('match')
				? 'bestMatchScore'
				: 'roomSpend'
			const SORT_ORDER = sortType.toLowerCase().includes('asc') ? 'ASC' : 'DESC'

			const list = await StageActivityHotelView.query()
				.skipUndefined()
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.andWhere('hotelName', 'ILIKE', `%${hotelName || ''}%`)
				.andWhere('templateCategory', templateCategory)
				.andWhere('sourceName', sourceName)
				.andWhere('cityName', 'ILIKE', `%${cityName || ''}%`)
				.orderBy(ORDER_BY, SORT_ORDER)
				.orderBy('id')

			const index = list.findIndex((hotel) => +hotel.id === +id)
			const data = index === -1 ? list[0] : list[index]
			const prevId = index < 1 ? null : +list[index - 1].id
			const nextId = index === list.length - 1 ? null : +list[index + 1].id
			return {
				recordCount: list.length,
				prevId,
				currIndex: Math.max(0, index),
				nextId,
				data
			}
		},
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
