import { HotelPropertyView } from '../models'
import { HotelPropertyType } from '../types'

export default {
	Query: {
		hotelPropertyList: async (
			_: null,
			{
				hotelName,
				hotelChainName,
				address1,
				cityName,
				stateCode,
				countryName,
				lanyonId,
				sabrePropertyId,
				apolloPropertyId,
				amadeusPropertyId,
				worldspanPropertyId,
				pageNumber = 0
			},
			{ hotel }
		): Promise<HotelPropertyType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const [{ count }] = await HotelPropertyView.query(hotel)
				.skipUndefined()
				.where('hotelName', 'ILIKE', `%${hotelName || ''}%`)
				.andWhere('hotelChainName', 'ILIKE', `%${hotelChainName || ''}%`)
				.andWhere('address1', 'ILIKE', `%${address1 || ''}%`)
				.andWhere('cityName', 'ILIKE', `%${cityName || ''}%`)
				.andWhere('stateCode', 'ILIKE', `%${stateCode || ''}%`)
				.andWhere('countryName', 'ILIKE', `%${countryName || ''}%`)
				.andWhere('lanyonId', 'ILIKE', `%${lanyonId || ''}%`)
				.andWhere('sabrePropertyId', 'ILIKE', `%${sabrePropertyId || ''}%`)
				.andWhere('apolloPropertyId', 'ILIKE', `%${apolloPropertyId || ''}%`)
				.andWhere('amadeusPropertyId', 'ILIKE', `%${amadeusPropertyId || ''}%`)
				.andWhere(
					'worldspanPropertyId',
					'ILIKE',
					`%${worldspanPropertyId || ''}%`
				)
				.count()

			return {
				pageCount: Math.ceil(+count / LIMIT),
				data: await HotelPropertyView.query(hotel)
					.skipUndefined()
					.where('hotelName', 'ILIKE', `%${hotelName || ''}%`)
					.andWhere('hotelChainName', 'ILIKE', `%${hotelChainName || ''}%`)
					.andWhere('address1', 'ILIKE', `%${address1 || ''}%`)
					.andWhere('cityName', 'ILIKE', `%${cityName || ''}%`)
					.andWhere('stateCode', 'ILIKE', `%${stateCode || ''}%`)
					.andWhere('countryName', 'ILIKE', `%${countryName || ''}%`)
					.andWhere('lanyonId', 'ILIKE', `%${lanyonId || ''}%`)
					.andWhere('sabrePropertyId', 'ILIKE', `%${sabrePropertyId || ''}%`)
					.andWhere('apolloPropertyId', 'ILIKE', `%${apolloPropertyId || ''}%`)
					.andWhere(
						'amadeusPropertyId',
						'ILIKE',
						`%${amadeusPropertyId || ''}%`
					)
					.andWhere(
						'worldspanPropertyId',
						'ILIKE',
						`%${worldspanPropertyId || ''}%`
					)
					.offset(OFFSET)
					.limit(LIMIT)
					.orderBy('hotelName')
			}
		}
	}
}
