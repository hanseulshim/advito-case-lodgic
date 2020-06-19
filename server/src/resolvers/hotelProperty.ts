import { HotelPropertyView } from '../models'
import { HotelPropertyType } from '../types'

export default {
	Query: {
		hotelPropertyList: async (
			_: null,
			{
				id,
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
			const query = HotelPropertyView.query(hotel)
				.select()
				.orderBy('hotelName')
				.offset(OFFSET)
				.limit(LIMIT)
				.orderBy('hotelName')
			const countQuery = HotelPropertyView.query(hotel).select().count()
			if (id) {
				query.where('id', id)
				countQuery.where('id', id)
			}
			if (hotelName) {
				query.where('hotelName', 'ILIKE', `%${hotelName}%`)
				countQuery.where('hotelName', 'ILIKE', `%${hotelName}%`)
			}
			if (hotelChainName) {
				query.where('hotelChainName', 'ILIKE', `%${hotelChainName}%`)
				countQuery.where('hotelChainName', 'ILIKE', `%${hotelChainName}%`)
			}
			if (address1) {
				query.where(function () {
					this.where('address1', 'ILIKE', `%${address1}%`).orWhere(
						'address2',
						'ILIKE',
						`%${address1}%`
					)
				})
				countQuery.where(function () {
					this.where('address1', 'ILIKE', `%${address1}%`).orWhere(
						'address2',
						'ILIKE',
						`%${address1}%`
					)
				})
			}
			if (cityName) {
				query.where('cityName', 'ILIKE', `%${cityName}%`)
				countQuery.where('cityName', 'ILIKE', `%${cityName}%`)
			}
			if (stateCode) {
				query.where('stateCode', 'ILIKE', `%${stateCode}%`)
				countQuery.where('stateCode', 'ILIKE', `%${stateCode}%`)
			}
			if (countryName) {
				query.where('countryName', 'ILIKE', `%${countryName}%`)
				countQuery.where('countryName', 'ILIKE', `%${countryName}%`)
			}
			if (lanyonId) {
				query.where('lanyonId', 'ILIKE', `%${lanyonId}%`)
				countQuery.where('lanyonId', 'ILIKE', `%${lanyonId}%`)
			}
			if (sabrePropertyId) {
				query.where('sabrePropertyId', 'ILIKE', `%${sabrePropertyId}%`)
				countQuery.where('sabrePropertyId', 'ILIKE', `%${sabrePropertyId}%`)
			}
			if (apolloPropertyId) {
				query.where('apolloPropertyId', 'ILIKE', `%${apolloPropertyId}%`)
				countQuery.where('apolloPropertyId', 'ILIKE', `%${apolloPropertyId}%`)
			}
			if (amadeusPropertyId) {
				query.where('amadeusPropertyId', 'ILIKE', `%${amadeusPropertyId}%`)
				countQuery.where('amadeusPropertyId', 'ILIKE', `%${amadeusPropertyId}%`)
			}
			if (worldspanPropertyId) {
				query.where('worldspanPropertyId', 'ILIKE', `%${worldspanPropertyId}%`)
				countQuery.where(
					'worldspanPropertyId',
					'ILIKE',
					`%${worldspanPropertyId}%`
				)
			}
			const [{ count }] = await countQuery
			return {
				recordCount: +count,
				data: await query
			}
		}
	}
}
