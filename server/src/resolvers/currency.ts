import { Currency } from '../models'
import { CurrencyType } from '../types'

export default {
	Query: {
		currencyList: async (): Promise<CurrencyType[]> =>
			Currency.query().orderBy('currencyCode')
	}
}
