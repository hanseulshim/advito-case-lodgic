import {
	StageActivityHotelCandidateView,
	StageActivityHotelView
} from '../models'
import {
	StageActivityHotelCandidateViewType,
	StageActivityHotelSingleType,
	StageActivityHotelType
} from '../types'

const getOrderBy = (sortType: string): string => {
	const orderBy = sortType.toLowerCase().includes('match')
		? 'best_match_score'
		: 'room_spend::float'
	const sortOrder = sortType.toLowerCase().includes('asc')
		? 'ASC'
		: 'DESC NULLS LAST'
	return `${orderBy} ${sortOrder}`
}

const statuses = ['processed', 'loaded', 'approved']

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
			const query = StageActivityHotelView.query()
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.whereIn('jobStatus', statuses)
				.offset(OFFSET)
				.limit(LIMIT)
				.orderByRaw(getOrderBy(sortType))
				.orderBy('id')
			const countQuery = StageActivityHotelView.query()
				.count()
				.first()
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.whereIn('jobStatus', statuses)
			if (hotelName) {
				query.where('hotelName', 'ILIKE', `%${hotelName || ''}%`)
				countQuery.where('hotelName', 'ILIKE', `%${hotelName || ''}%`)
			}
			if (templateCategory) {
				query.where('templateCategory', templateCategory)
				countQuery.where('templateCategory', templateCategory)
			}
			if (sourceName) {
				query.where('sourceName', sourceName)
				countQuery.where('sourceName', sourceName)
			}
			if (cityName) {
				query.where('cityName', 'ILIKE', `%${cityName || ''}%`)
				countQuery.where('cityName', 'ILIKE', `%${cityName || ''}%`)
			}
			const { count } = await countQuery
			return {
				recordCount: +count,
				data: await query
			}
		},
		unmatchedHotel: async (
			_: null,
			{
				currPosition = 0,
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
			const countQuery = StageActivityHotelView.query()
				.count()
				.first()
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.whereIn('jobStatus', statuses)
			const query = StageActivityHotelView.query()
				.where('clientId', clientId)
				.whereNull('matchedHotelPropertyId')
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)
				.whereIn('jobStatus', statuses)
				.orderByRaw(getOrderBy(sortType))
			if (hotelName) {
				query.where('hotelName', 'ILIKE', `%${hotelName || ''}%`)
				countQuery.where('hotelName', 'ILIKE', `%${hotelName || ''}%`)
			}
			if (templateCategory) {
				query.where('templateCategory', templateCategory)
				countQuery.where('templateCategory', templateCategory)
			}
			if (sourceName) {
				query.where('sourceName', sourceName)
				countQuery.where('sourceName', sourceName)
			}
			if (cityName) {
				query.where('cityName', 'ILIKE', `%${cityName || ''}%`)
				countQuery.where('cityName', 'ILIKE', `%${cityName || ''}%`)
			}
			if (currPosition === 0) {
				query.limit(2)
			} else {
				query.limit(3).offset(currPosition - 1)
			}
			const list = await query

			const { count } = await countQuery

			const index = list.length === 0 ? null : list.length === 2 ? 0 : 1
			const data = index === null ? null : list[index]
			const prevId = index ? +list[index - 1].id : null
			const nextId = index === null ? null : +list[index + 1].id
			return {
				recordCount: +count,
				prevId,
				currPosition,
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
				.whereIn('jobStatus', statuses)
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
				.whereIn('jobStatus', statuses)
			return result.map((r) => r.sourceName)
		},
		unmatchedHotelConfidenceList: async (
			_: null,
			{ stageActivityHotelId },
			{ hotel }
		): Promise<StageActivityHotelCandidateViewType[]> =>
			StageActivityHotelCandidateView.query(hotel)
				.where('stageActivityHotelId', stageActivityHotelId)
				.orderBy('matchScore', 'DESC')
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
