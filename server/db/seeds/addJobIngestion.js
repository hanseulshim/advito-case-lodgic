const faker = require('faker')

const createJobIngestionRow = ([clientList, applicationTemplateSourceList]) => {
	const { id, application_name, template_name } = faker.random.arrayElement(
		applicationTemplateSourceList
	)
	const dataStartDate = faker.date.recent(0)
	return {
		advito_user_id: 882, // Pony User Id
		client_id: faker.random.arrayElement(clientList).client_id,
		advito_application_template_source_id: id,
		data_start_date: dataStartDate,
		data_end_date: faker.date.recent(-60),
		upload_timestamp: dataStartDate,
		original_file_name: `${application_name}-${template_name}.xlsx`,
		processing_start_timestamp: dataStartDate,
		processing_end_timestamp: new Date(dataStartDate.valueOf() + 6000),
		processing_dur_sec: 60,
		count_rows: faker.random.number({ min: 50, max: 100 }),
		file_size: faker.random.number({ min: 5000, max: 10000 }),
		file_extension: '.xlsx',
		is_complete: true,
		job_status: 'done',
		job_note: null
	}
}

const createJobIngestionHotelRow = (id) => {
	const dpm = faker.random.boolean()
	const sourcing = faker.random.boolean()
	return {
		job_ingestion_id: id,
		currency_ingested: 'Local',
		room_nights_total: faker.random.number(7000, 15000),
		unmatched_count: faker.random.number(500, 1000),
		unmatched_spend: faker.finance.amount(25000, 75000, 2),
		unmatched_spend_usd: faker.finance.amount(25000, 75000, 2),
		matched_spend: faker.finance.amount(50000, 100000, 2),
		matched_spend_usd: faker.finance.amount(50000, 100000, 2),
		is_dpm: dpm,
		status_dpm: dpm ? faker.random.arrayElement(['Loaded', 'Approved']) : null,
		date_status_dpm: dpm ? faker.date.recent(10) : null,
		is_sourcing: sourcing,
		status_sourcing: sourcing
			? faker.random.arrayElement(['Loaded', 'Approved'])
			: null,
		date_status_sourcing: sourcing ? faker.date.recent(10) : null
	}
}

exports.seed = async (knex) => {
	const res = await Promise.all([
		knex('client as c')
			.leftJoin('client_advito_application_link as cl', 'cl.client_id', 'c.id')
			.select('cl.client_id', 'c.client_name')
			.where('cl.advito_application_id', 1)
			.andWhere('c.id', 348)
			.orderBy('client_name'),
		knex('advito_application_template_source as ts')
			.select('ts.id', 'a.application_name', 't.template_name')
			.leftJoin(
				'advito_application_template as t',
				't.id',
				'ts.advito_application_template_id'
			)
			.leftJoin('advito_application as a', 't.advito_application_id', 'a.id')
			.where('a.id', 1)
	])
	const jobIngestionRows = []
	const jobIngestionHotelRows = []
	for (i = 0; i < 30; i++) {
		jobIngestionRows.push(createJobIngestionRow(res))
	}
	await knex('stage_activity_hotel_candidate').del()
	await knex('stage_activity_hotel').del()
	await knex('job_ingestion_log').del()
	await knex('job_ingestion_hotel').del()
	await knex('job_ingestion').del()
	const idList = await knex('job_ingestion')
		.insert(jobIngestionRows)
		.returning('id')
	for (const id of idList) {
		jobIngestionHotelRows.push(createJobIngestionHotelRow(id))
	}
	await knex('job_ingestion_hotel').insert(jobIngestionHotelRows)
}
