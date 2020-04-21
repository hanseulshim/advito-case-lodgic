const faker = require('faker')
const yenv = require('yenv')

const env = yenv('../env.yml', {
	env: process.env.npm_config_argv.includes('staging') ? 'staging' : 'dev'
})
const database = require('knex')({
	client: 'pg',
	connection: {
		host: env.DB_HOST,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		database: 'hotel'
	}
})

const createRow = (stageActivityHotelId, hotelList) => {
	const { id } = faker.random.arrayElement(hotelList)
	return {
		stage_activity_hotel_id: stageActivityHotelId,
		hotel_property_id: id,
		match_score: faker.finance.amount(0, 1, 2),
		confidence_score: faker.finance.amount(0, 1, 2)
	}
}

exports.seed = async (knex) => {
	const hotelList = await database('hotel_property').select('id').limit(10000)
	const stageActivityHotelList = await knex('stage_activity_hotel').select('id')
	const rows = []
	for (const { id } of stageActivityHotelList) {
		let file = []
		for (let i = 0; i < 5; i++) {
			file.push(createRow(id, hotelList))
		}
		rows.push(knex('stage_activity_hotel_candidate').insert(file))
		file = []
	}
	await Promise.all(rows)

	const bestMatchScoreList = await knex('stage_activity_hotel as ah')
		.select('ah.id', 'sc.best_match_score')
		.leftJoin(
			knex.raw(`
    (SELECT stage_activity_hotel_id, MAX(match_score) best_match_score
    FROM stage_activity_hotel_candidate
    GROUP BY stage_activity_hotel_id) sc
    ON ah.id = sc.stage_activity_hotel_id`)
		)

	const updateRows = []
	for (const { id, best_match_score } of bestMatchScoreList) {
		updateRows.push(
			knex('stage_activity_hotel')
				.update({
					best_match_score
				})
				.where('id', id)
		)
	}
	await Promise.all(updateRows)
}
