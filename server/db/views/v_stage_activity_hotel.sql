CREATE OR REPLACE VIEW "public"."v_stage_activity_hotel" AS  SELECT ah.id,
    i.client_id,
    i.client_name,
    i.advito_user_id,
    i.username,
    i.advito_application_id,
    i.application_name,
    i.advito_application_template_id,
    i.template_name,
    i.advito_application_template_source_id,
    i.source_name,
    i.template_category,
    i.upload_timestamp,
    i.data_start_date,
    i.data_end_date,
    ah.chain_name,
    ah.brand_code,
    ah.brand_name,
    ah.internal_hotel_code,
    ah.lanyon_id,
    ah.sabre_property_id,
    ah.apollo_property_id,
    ah.worldspan_property_id,
    ah.amadeus_property_id,
    ah.hrs_id,
    ah.merchant_id,
    ah.hotel_name,
    ah.hotel_name_alternate,
    ah.address_line_1,
    ah.address_line_2,
    ah.city_name,
    ah.city_latitude,
    ah.city_longitude,
    ah.state_code,
    ah.country_name,
    ah.country_code,
    ah.zip_or_postal_code,
    ah.phone_number,
    ah.hotel_latitude,
    ah.hotel_longitude,
    ah.start_date,
    ah.end_date,
    ah.invoice_date,
    ah.transaction_date,
    ah.posted_date,
    ah.check_in_date,
    ah.check_out_date,
    ah.number_of_nights,
    ah.number_of_rooms,
    ah.room_rate,
    ah.room_type,
    ah.transaction_currency,
    ah.report_currency,
    ah.currency_conversion_rate,
    ah.number_of_transactions,
    ah.pos_country_code,
    ah.traveler_last_name,
    ah.traveler_first_name,
    ah.traveler_id,
    ah.business_unit_id,
    ah.business_unit_name,
    ah.hotel_confirmation_number,
    ah.folio_number,
    ah.invoice_number,
    ah.room_spend,
    ah.fees_and_taxes,
    ah.breakfast,
    ah.wifi,
    ah.parking,
    ah.in_room_dining,
    ah.f_b_spend,
    ah.entertainment,
    ah.transportation,
    ah.other_spend,
    ah.total_hotel_spend,
    ah.exception_desc,
    ah.session_key,
    ah.file_info,
    ah.job_ingestion_id,
    ah.is_processed,
    ah.is_matched,
    ah.matched_hotel_property_id,
    ah.ingested_datetime,
    ah.best_match_score
   FROM (stage_activity_hotel ah
     JOIN v_job_ingestion i ON ((i.id = ah.job_ingestion_id)));

ALTER TABLE "public"."v_stage_activity_hotel" OWNER TO "AdvitoAdmin";