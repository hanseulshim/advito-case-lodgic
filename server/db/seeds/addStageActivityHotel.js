const faker = require('faker')

const createRow = (id) => {
	return {
		brand_code: faker.random.alphaNumeric(2),
		client_name: `Client Name - ${faker.random.number(10000)}`,
		gcn: faker.random.number(10000),
		locator: `Locator - ${faker.random.number(10000)}`,
		agency_name: `Agency Name - ${faker.random.number(10000)}`,
		apollo_property_id: faker.random.number(10000),
		sabre_property_id: faker.random.number(10000),
		traveler: `Traveler - ${faker.random.number(10000)}`,
		agency_code: `Agency Code - ${faker.random.number(10000)}`,
		amadeus_property_id: faker.random.number(10000),
		booking_source: `Booking Source - ${faker.random.number(10000)}`,
		global_hotel_reason_code: faker.random.number(10000),
		local_hotel_reason_code: faker.random.number(10000),
		merchant_id: faker.random.number(10000),
		worldspan_property_id: faker.random.number(10000),
		exchange_indicator: `Exchange Indicator - ${faker.random.number(10000)}`,
		hotel_name: `Hotel Name - ${faker.random.number(10000)}`,
		hotel_name_alternate: `Hotel Name Alternate - ${faker.random.number(
			10000
		)}`,
		int_dom: faker.random.number(10000),
		internal_hotel_code: faker.random.number(10000),
		lanyon_id: faker.random.number(10000),
		original_document_number: faker.random.number(10000),
		refund_indicator: `Refund Indicator - ${faker.random.number(10000)}`,
		city_name: faker.address.city(),
		hrs_id: faker.random.number(10000),
		state_code: faker.address.stateAbbr(),
		ticketing_country: faker.address.country(),
		ticketing_region: `Ticketing Region - ${faker.random.number(10000)}`,
		traveler_country: faker.address.country(),
		city_latitude: faker.address.latitude(),
		city_longitude: faker.address.longitude(),
		confirmation_number: faker.random.number(10000),
		country_code: faker.address.country(),
		country_name: faker.address.countryCode(),
		hotel_chain_code: faker.random.number(10000),
		invoice_date: faker.date.recent(100),
		phone_number: faker.phone.phoneNumberFormat(),
		postal_code: faker.address.zipCode(),
		address_1: faker.address.streetAddress('###'),
		address_2: faker.address.secondaryAddress(),
		check_in_date: faker.date.recent(100),
		end_date: faker.date.recent(-100),
		hotel_brand_name: `Hotel Brand Name - ${faker.random.number(10000)}`,
		hotel_chain_name: `Hotel Chain Name - ${faker.random.number(10000)}`,
		property_name: `Property Name - ${faker.random.number(10000)}`,
		start_date: faker.date.recent(100),
		check_out_date: faker.date.recent(-100),
		major_city: faker.address.city(),
		number_of_nights: faker.random.number(10000),
		posted_date: faker.date.recent(100),
		property_city_code: faker.address.cityPrefix(),
		transaction_date: faker.date.recent(100),
		currency_conversion_rate: faker.finance.amount(1, 100, 2),
		number_of_rooms: faker.random.number(10000),
		property_phone: faker.phone.phoneNumberFormat(),
		report_currency: faker.finance.currencyName(),
		room_rate: faker.random.number(10000),
		room_type: faker.random.number(10),
		transaction_currency: faker.finance.currencyName(),
		invoice_number: faker.random.number(10000),
		number_of_transactions: faker.random.number(10000),
		pos_country_code: faker.address.country(),
		room_type_code: faker.random.alphaNumeric(5),
		traveler_last_name: faker.name.lastName(),
		breakfast: faker.random.boolean(),
		business_unit_id: faker.random.number(10000),
		business_unit_name: `Business Unit Name - ${faker.random.number(10000)}`,
		fees_and_taxes: `Fees And Taxes - ${faker.random.number(10000)}`,
		hotel_preferred_indicator: `Hotel Preferred Indicator - ${faker.random.number(
			10000
		)}`,
		rate_category: faker.random.number(10000),
		room_spend: faker.finance.amount(100000, 500000, 2),
		total_amount: faker.finance.amount(100000, 500000, 2),
		traveler_first_name: faker.name.firstName(),
		traveler_id: faker.random.number(10000),
		booking_date: faker.date.recent(100),
		f_b_spend: faker.finance.amount(100000, 500000, 2),
		folio_number: faker.random.number(10000),
		highest_rate_available: faker.random.number(10000),
		hotel_confirmation_number: faker.random.number(10000),
		in_room_dining: faker.random.boolean(),
		lowest_rate_available: faker.random.number(10000),
		parking: faker.random.boolean(),
		service_fees: faker.random.boolean(),
		wifi: faker.random.boolean(),
		conversion_rate: faker.finance.amount(1, 100, 2),
		entertainment: faker.random.boolean(),
		other_spend: faker.finance.amount(100000, 500000, 2),
		source_currency_code: faker.finance.currencyCode(),
		total_hotel_spend: faker.finance.amount(100000, 500000, 2),
		transaction_currency_code: faker.finance.currencyCode(),
		transportation: faker.random.boolean(),
		property_latitude: faker.address.latitude(),
		property_longitude: faker.address.longitude(),
		client_field_1: `Client Field 1 - ${faker.random.number(10000)}`,
		client_field_10: `Client Field 10 - ${faker.random.number(10000)}`,
		client_field_2: `Client Field 2 - ${faker.random.number(10000)}`,
		client_field_3: `Client Field 3 - ${faker.random.number(10000)}`,
		client_field_4: `Client Field 4 - ${faker.random.number(10000)}`,
		client_field_5: `Client Field 5 - ${faker.random.number(10000)}`,
		client_field_6: `Client Field 6 - ${faker.random.number(10000)}`,
		client_field_7: `Client Field 7 - ${faker.random.number(10000)}`,
		client_field_8: `Client Field 8 - ${faker.random.number(10000)}`,
		client_field_9: `Client Field 9 - ${faker.random.number(10000)}`,
		exception_desc: `Exception Desc - ${faker.random.number(10000)}`,
		session_key: faker.random.alphaNumeric(20),
		file_info: `File Info - ${faker.random.number(10000)}`,
		job_ingestion_id: id,
		is_processed: true,
		is_matched: null,
		matched_hotel_property_id: null,
		best_match_score: null
	}
}

exports.seed = async (knex) => {
	const rows = []
	const idList = await knex('job_ingestion')
		.select('id', 'count_rows')
		.where('is_complete', true)
		.andWhere('job_status', 'done')
	for (const { id, count_rows } of idList) {
		let file = []
		for (let i = 0; i < count_rows; i++) {
			file.push(createRow(id, count_rows))
		}
		rows.push(knex('stage_activity_hotel').insert(file))
		file = []
	}
	await Promise.all(rows)
}
