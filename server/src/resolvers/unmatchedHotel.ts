import {
	StageActivityHotelView,
	StageActivityHotelCandidateView
} from '../models'
import {
	StageActivityHotelSingleType,
	StageActivityHotelType,
	StageActivityHotelCandidateViewType
} from '../types'

const getOrderBy = (sortType: string): string => {
	const orderBy = sortType.toLowerCase().includes('match')
		? 'best_match_score'
		: 'room_spend'
	const sortOrder = sortType.toLowerCase().includes('asc')
		? 'ASC'
		: 'DESC NULLS LAST'
	return `${orderBy} ${sortOrder}`
}

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
					.orderByRaw(getOrderBy(sortType))
					.orderBy('id')
			}
		},
		unmatchedHotel: async (
			_: null,
			{
				currPosition = 1,
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
			const list =
				currPosition > 1
					? await StageActivityHotelView.query()
							.skipUndefined()
							.where('clientId', clientId)
							.whereNull('matchedHotelPropertyId')
							.andWhere('dataStartDate', '>=', startDate)
							.andWhere('dataEndDate', '<=', endDate)
							.andWhere('hotelName', 'ILIKE', `%${hotelName || ''}%`)
							.andWhere('templateCategory', templateCategory)
							.andWhere('sourceName', sourceName)
							.andWhere('cityName', 'ILIKE', `%${cityName || ''}%`)
							.orderByRaw(getOrderBy(sortType))
							.offset(currPosition - 1)
							.limit(3)
					: await StageActivityHotelView.query()
							.skipUndefined()
							.where('clientId', clientId)
							.whereNull('matchedHotelPropertyId')
							.andWhere('dataStartDate', '>=', startDate)
							.andWhere('dataEndDate', '<=', endDate)
							.andWhere('hotelName', 'ILIKE', `%${hotelName || ''}%`)
							.andWhere('templateCategory', templateCategory)
							.andWhere('sourceName', sourceName)
							.andWhere('cityName', 'ILIKE', `%${cityName || ''}%`)
							.orderByRaw(getOrderBy(sortType))
							.limit(2)

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

			const index = list.length === 0 ? null : list.length === 2 ? 0 : 1
			const data = index === null ? null : list[index]
			const prevId = index ? +list[index - 1].id : null
			const nextId = index === null ? null : +list[index + 1].id
			return {
				recordCount: +count,
				prevId,
				currPosition: currPosition ? currPosition : 1,
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
