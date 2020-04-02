import { Model } from 'objection'

export class AdvitoApplication extends Model {
	static tableName = 'advitoApplication'
}

export class AdvitoApplicationRole extends Model {
	advitoApplicationId: number
	static tableName = 'advitoApplicationRole'
}

export class AdvitoApplicationTemplate extends Model {
	static tableName = 'advitoApplicationTemplate'
}

export class AdvitoApplicationTemplateSource extends Model {
	static tableName = 'advitoApplicationTemplateSource'
}
