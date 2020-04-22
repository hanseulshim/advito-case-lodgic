import { Model } from 'objection'

export class Currency extends Model {
	id: number
	currencyName: string
	currencyCode: string
	currencySymbol: string

	static tableName = 'currency'
}
