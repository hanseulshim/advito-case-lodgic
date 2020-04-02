const faker = require('faker')

const createRow = () => {
	const dpm = faker.random.boolean()
	const sourcing = faker.random.boolean()
	return {
		job_ingestion_id: faker.random.arrayElement([282, 280, 271]),
		currency_ingested: 'Local',
		room_nights_total: faker.random.number(7000, 15000),
		unmatched_count: faker.random.number(2000, 7000),
		unmatched_spend: faker.finance.amount(20000, 100000, 2),
		unmatched_spend_usd: faker.finance.amount(20000, 100000, 2),
		matched_spend: faker.finance.amount(20000, 100000, 2),
		matched_spend_usd: faker.finance.amount(20000, 100000, 2),
		is_dpm: dpm,
		status_dpm: dpm ? faker.random.arrayElement[('Loaded', 'Approved')] : null,
		date_status_dpm: dpm ? faker.date.recent(10) : null,
		is_sourcing: sourcing,
		status_sourcing: sourcing
			? faker.random.arrayElement[('Loaded', 'Approved')]
			: null,
		date_status_sourcing: sourcing ? faker.date.recent(10) : null
	}
}

exports.seed = async knex => {
	const rows = []
	for (i = 0; i < 1000; i++) {
		rows.push(createRow())
	}
	await knex('job_ingestion_hotel').del()
	await knex('job_ingestion_hotel').insert(rows)
}
