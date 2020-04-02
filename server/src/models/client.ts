import { Model } from 'objection'

export class Client extends Model {
	id: number
	clientName: string

	static tableName = 'client'

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	static get relationMappings() {
		const { AdvitoApplication } = require('./application')
		return {
			applications: {
				relation: Model.ManyToManyRelation,
				modelClass: AdvitoApplication,
				join: {
					from: 'client.id',
					through: {
						from: 'clientAdvitoApplicationLink.clientId',
						to: 'clientAdvitoApplicationLink.advitoApplicationId'
					},
					to: 'advitoApplication.id'
				}
			}
		}
	}
}
