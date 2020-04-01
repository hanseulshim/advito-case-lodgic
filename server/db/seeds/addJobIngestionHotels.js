const faker = require('faker')

const jobIdList = [282, 280, 271]

// const createRow = () => ({
//   "job_ingestion_id": jobIdList[Math.floor(Math.random()*3)],
//   "ingestion_type" varchar(255) COLLATE "pg_catalog"."default",
//   "original_unmatched_count" int4,
//   "original_unmatched_spend_usd" numeric(16,4),
//   "unmatched_count" int4,
//   "unmatched_spend_usd" numeric(16,4),
//   "matched_count" int4,
//   "matched_spend_usd" numeric(16,4),
//   "ingestion_status" varchar(255) COLLATE "pg_catalog"."default",
//   "is_dpm" bool NOT NULL,
//   "status_dpm" varchar(255) COLLATE "pg_catalog"."default",
//   "date_status_dpm" timestamp(6),
//   "is_sourcing" bool NOT NULL,
//   "status_sourcing" varchar(255) COLLATE "pg_catalog"."default",
//   "date_status_sourcing" timestamp(6),
//   "ingestion_note" text COLLATE "pg_catalog"."default",
// })

exports.seed = knex => {
	// Deletes ALL existing entries
	return knex('job_ingestion_hotel')
		.del()
		.then(() => {
			// Inserts seed entries
			return knex('job_ingestion_hotel').insert([
				{
					job_ingestion_id: 55,
					is_dpm: true,
					is_sourcing: false
				}
			])
		})
}

// "job_ingestion_id" int8 NOT NULL,
// "ingestion_type" varchar(255) COLLATE "pg_catalog"."default",
// "original_unmatched_count" int4,
// "original_unmatched_spend_usd" numeric(16,4),
// "unmatched_count" int4,
// "unmatched_spend_usd" numeric(16,4),
// "matched_count" int4,
// "matched_spend_usd" numeric(16,4),
// "ingestion_status" varchar(255) COLLATE "pg_catalog"."default",
// "is_dpm" bool NOT NULL,
// "status_dpm" varchar(255) COLLATE "pg_catalog"."default",
// "date_status_dpm" timestamp(6),
// "is_sourcing" bool NOT NULL,
// "status_sourcing" varchar(255) COLLATE "pg_catalog"."default",
// "date_status_sourcing" timestamp(6),
// "ingestion_note" text COLLATE "pg_catalog"."default",
