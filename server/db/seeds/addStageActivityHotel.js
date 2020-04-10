const faker = require('faker')

const createRow = (id, rowCount) => {
	return {
		brand_code: faker.random.alphaNumeric(2),
		brand_name: `Brand Name - ${faker.random.number(1000)}`,
		chain_name: `Chain Name - ${faker.random.number(1000)}`,
		client_name: `Client Name - ${faker.random.number(1000)}`,
		gcn: `GCN - ${faker.random.number(1000)}`,
		locator: `Locator - ${faker.random.number(1000)}`,
		agency_name: `Agency Name - ${faker.random.number(1000)}`,
		apollo_property_id: `Apollo Property Id - ${faker.random.number(1000)}`,
		sabre_property_id: `Sabre Property Id - ${faker.random.number(1000)}`,
		traveler: `Traveler - ${faker.random.number(1000)}`,
		agency_code: `Agency Code - ${faker.random.number(1000)}`,
		amadeus_property_id: `Amadeus Property Id - ${faker.random.number(1000)}`,
		booking_source: `Booking Source - ${faker.random.number(1000)}`,
		global_hotel_reason_code: `Global Hotel Reason Code - ${faker.random.number(
			1000
		)}`,
		local_hotel_reason_code: `Local Hotel Reason Code - ${faker.random.number(
			1000
		)}`,
		merchant_id: `Merchant Id - ${faker.random.number(1000)}`,
		worldspan_property_id: `Worldspan Property Id - ${faker.random.number(
			1000
		)}`,
		address_line_1: `Address Line 1 - ${faker.random.number(1000)}`,
		address_line_2: `Address Line 2 - ${faker.random.number(1000)}`,
		exchange_indicator: `Exchange Indicator - ${faker.random.number(1000)}`,
		hotel_name: `Hotel Name - ${faker.random.number(1000)}`,
		hotel_name_alternate: `Hotel Name Alternate - ${faker.random.number(1000)}`,
		int_dom: `Int Dom - ${faker.random.number(1000)}`,
		internal_hotel_code: `Internal Hotel Code - ${faker.random.number(1000)}`,
		lanyon_id: `Lanyon Id - ${faker.random.number(1000)}`,
		original_document_number: `Original Document Number - ${faker.random.number(
			1000
		)}`,
		refund_indicator: `Refund Indicator - ${faker.random.number(1000)}`,
		city_name: `City Name - ${faker.random.number(1000)}`,
		hrs_id: `Hrs Id - ${faker.random.number(1000)}`,
		state_code: `State Code - ${faker.random.number(1000)}`,
		ticketing_country: `Ticketing Country - ${faker.random.number(1000)}`,
		ticketing_region: `Ticketing Region - ${faker.random.number(1000)}`,
		traveler_country: `Traveler Country - ${faker.random.number(1000)}`,
		city_latitude: `City Latitude - ${faker.random.number(1000)}`,
		city_longitude: `City Longitude - ${faker.random.number(1000)}`,
		confirmation_number: `Confirmation Number - ${faker.random.number(1000)}`,
		country_code: `Country Code - ${faker.random.number(1000)}`,
		country_name: `Country Name - ${faker.random.number(1000)}`,
		hotel_chain_code: `Hotel Chain Code - ${faker.random.number(1000)}`,
		invoice_date: `Invoice Date - ${faker.random.number(1000)}`,
		phone_number: `Phone Number - ${faker.random.number(1000)}`,
		zip_or_postal_code: `Zip Or Postal Code - ${faker.random.number(1000)}`,
		address_1: `Address 1 - ${faker.random.number(1000)}`,
		address_2: `Address 2 - ${faker.random.number(1000)}`,
		check_in_date: `Check In Date - ${faker.random.number(1000)}`,
		end_date: `End Date - ${faker.random.number(1000)}`,
		hotel_brand_name: `Hotel Brand Name - ${faker.random.number(1000)}`,
		hotel_chain_name: `Hotel Chain Name - ${faker.random.number(1000)}`,
		hotel_latitude: `Hotel Latitude - ${faker.random.number(1000)}`,
		hotel_longitude: `Hotel Longitude - ${faker.random.number(1000)}`,
		start_date: `Start Date - ${faker.random.number(1000)}`,
		check_out_date: `Check Out Date - ${faker.random.number(1000)}`,
		major_city: `Major City - ${faker.random.number(1000)}`,
		number_of_nights: `Number Of Nights - ${faker.random.number(1000)}`,
		posted_date: `Posted Date - ${faker.random.number(1000)}`,
		property_city: `Property City - ${faker.random.number(1000)}`,
		property_city_code: `Property City Code - ${faker.random.number(1000)}`,
		state: `State - ${faker.random.number(1000)}`,
		transaction_date: `Transaction Date - ${faker.random.number(1000)}`,
		country: `Country - ${faker.random.number(1000)}`,
		currency_conversion_rate: `Currency Conversion Rate - ${faker.random.number(
			1000
		)}`,
		number_of_rooms: `Number Of Rooms - ${faker.random.number(1000)}`,
		postal_code: `Postal Code - ${faker.random.number(1000)}`,
		property_phone: `Property Phone - ${faker.random.number(1000)}`,
		report_currency: `Report Currency - ${faker.random.number(1000)}`,
		room_rate: `Room Rate - ${faker.random.number(1000)}`,
		room_type: `Room Type - ${faker.random.number(1000)}`,
		transaction_currency: `Transaction Currency - ${faker.random.number(1000)}`,
		invoice_number: `Invoice Number - ${faker.random.number(1000)}`,
		number_of_transactions: `Number Of Transactions - ${faker.random.number(
			1000
		)}`,
		pos_country_code: `Pos Country Code - ${faker.random.number(1000)}`,
		room_type_code: `Room Type Code - ${faker.random.number(1000)}`,
		traveler_last_name: `Traveler Last Name - ${faker.random.number(1000)}`,
		breakfast: `Breakfast - ${faker.random.number(1000)}`,
		business_unit_id: `Business Unit Id - ${faker.random.number(1000)}`,
		business_unit_name: `Business Unit Name - ${faker.random.number(1000)}`,
		fees_and_taxes: `Fees And Taxes - ${faker.random.number(1000)}`,
		hotel_preferred_indicator: `Hotel Preferred Indicator - ${faker.random.number(
			1000
		)}`,
		rate_category: `Rate Category - ${faker.random.number(1000)}`,
		room_spend: `Room Spend - ${faker.random.number(1000)}`,
		total_amount: `Total Amount - ${faker.random.number(1000)}`,
		traveler_first_name: `Traveler First Name - ${faker.random.number(1000)}`,
		traveler_id: `Traveler Id - ${faker.random.number(1000)}`,
		booking_date: `Booking Date - ${faker.random.number(1000)}`,
		f_b_spend: `F B Spend - ${faker.random.number(1000)}`,
		folio_number: `Folio Number - ${faker.random.number(1000)}`,
		highest_rate_available: `Highest Rate Available - ${faker.random.number(
			1000
		)}`,
		hotel_confirmation_number: `Hotel Confirmation Number - ${faker.random.number(
			1000
		)}`,
		in_room_dining: `In Room Dining - ${faker.random.number(1000)}`,
		lowest_rate_available: `Lowest Rate Available - ${faker.random.number(
			1000
		)}`,
		parking: `Parking - ${faker.random.number(1000)}`,
		service_fees: `Service Fees - ${faker.random.number(1000)}`,
		wifi: `Wifi - ${faker.random.number(1000)}`,
		amadeus_id: `Amadeus Id - ${faker.random.number(1000)}`,
		conversion_rate: `Conversion Rate - ${faker.random.number(1000)}`,
		entertainment: `Entertainment - ${faker.random.number(1000)}`,
		other_spend: `Other Spend - ${faker.random.number(1000)}`,
		source_currency_code: `Source Currency Code - ${faker.random.number(1000)}`,
		total_hotel_spend: `Total Hotel Spend - ${faker.random.number(1000)}`,
		transaction_currency_code: `Transaction Currency Code - ${faker.random.number(
			1000
		)}`,
		transportation: `Transportation - ${faker.random.number(1000)}`,
		apollo_id: `Apollo Id - ${faker.random.number(1000)}`,
		sabre_id: `Sabre Id - ${faker.random.number(1000)}`,
		worldspan_id: `Worldspan Id - ${faker.random.number(1000)}`,
		property_latitude: `Property Latitude - ${faker.random.number(1000)}`,
		property_longitude: `Property Longitude - ${faker.random.number(1000)}`,
		client_field_1: `Client Field 1 - ${faker.random.number(1000)}`,
		client_field_10: `Client Field 10 - ${faker.random.number(1000)}`,
		client_field_2: `Client Field 2 - ${faker.random.number(1000)}`,
		client_field_3: `Client Field 3 - ${faker.random.number(1000)}`,
		client_field_4: `Client Field 4 - ${faker.random.number(1000)}`,
		client_field_5: `Client Field 5 - ${faker.random.number(1000)}`,
		client_field_6: `Client Field 6 - ${faker.random.number(1000)}`,
		client_field_7: `Client Field 7 - ${faker.random.number(1000)}`,
		client_field_8: `Client Field 8 - ${faker.random.number(1000)}`,
		client_field_9: `Client Field 9 - ${faker.random.number(1000)}`,
		exception_desc: `Exception Desc - ${faker.random.number(1000)}`,
		session_key: `Session Key - ${faker.random.number(1000)}`,
		file_info: `File Info - ${faker.random.number(1000)}`,
		job_ingestion_id: id,
		is_processed: true,
		is_matched: true,
		matched_hotel_property_id: 1,
		best_match_score: faker.finance.amount(0, 1, 2)
	}
}

exports.seed = async (knex) => {
	const rows = []
	const idList = await knex('job_ingestion')
		.select('id', 'count_rows')
		.where('is_complete', true)
		.andWhere('job_status', 'done')
	for (const { id, count_rows } of idList) {
		for (let i = 0; i < count_rows; i++) {
			rows.push(createRow(id, count_rows))
		}
	}
	console.log(rows.length)
	await knex('stage_activity_hotel').del()
	await knex('stage_activity_hotel').insert(rows)
}
