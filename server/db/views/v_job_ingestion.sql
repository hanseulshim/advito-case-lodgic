CREATE OR REPLACE VIEW "public"."v_job_ingestion" AS  SELECT ji.id,
    ji.advito_user_id,
    u.username,
    ji.client_id,
    cl.client_name,
    appt.advito_application_id,
    app.application_name,
    appts.advito_application_template_id,
    appt.template_name,
    ji.advito_application_template_source_id,
    appts.source_name,
    ji.data_start_date,
    ji.data_end_date,
    ji.upload_timestamp,
    ji.original_file_name,
    ji.job_name,
    ji.processing_start_timestamp,
    ji.processing_end_timestamp,
    ji.processing_dur_sec,
    ji.count_rows,
    ji.file_size,
    ji.file_extension,
    ji.is_complete,
    ji.job_status,
    ji.job_note,
    ji.created,
    ji.modified,
    u.name_last,
    u.name_first,
    appt.template_note,
    appt.template_category
   FROM (((((job_ingestion ji
     JOIN advito_user u ON ((u.id = ji.advito_user_id)))
     JOIN client cl ON ((cl.id = ji.client_id)))
     JOIN advito_application_template_source appts ON ((appts.id = ji.advito_application_template_source_id)))
     JOIN advito_application_template appt ON ((appt.id = appts.advito_application_template_id)))
     JOIN advito_application app ON ((app.id = appt.advito_application_id)));

ALTER TABLE "public"."v_job_ingestion" OWNER TO "AdvitoAdmin";