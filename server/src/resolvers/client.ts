import { Client } from '../models'
import { ClientType } from '../types'

export default {
	Query: {
		clientList: async (): Promise<ClientType[]> => {
			return Client.query()
				.alias('c')
				.skipUndefined()
				.distinct('c.id', 'c.clientName')
				.leftJoinRelated('applications as a')
				.whereIn('a.id', [1, 5]) // This is for HPM + Hotel App
				.where('c.isActive', true)
				.orderBy('c.clientName')
		}
	}
}
