import { parse } from 'json2csv'
import {
	HotelProject,
	HotelProjectProperty,
	JobIngestion,
	JobIngestionHotel,
	JobIngestionHotelView,
	StageActivityHotel,
	StageActivityHotelCandidate
} from '../models'
import { JobIngestionHotelType } from '../types'

export default {
	Query: {
		ingestionHotelList: async (
			_: null,
			{ clientId, startDate, endDate, pageNumber = 0 }
		): Promise<JobIngestionHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const [{ count }] = await JobIngestionHotelView.query()
				.count()
				.where('clientId', clientId)
				.andWhere('dataStartDate', '>=', startDate)
				.andWhere('dataEndDate', '<=', endDate)

			return {
				recordCount: +count,
				data: await JobIngestionHotelView.query()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.whereIn(
						'jobStatus',
						process.env.ENVIRONMENT === 'PRODUCTION'
							? ['done', 'ingested', 'processed', 'loaded', 'approved']
							: ['processed', 'loaded', 'approved']
					)
					.offset(OFFSET)
					.limit(LIMIT)
					.orderBy(['dataStartDate', 'templateCategory', 'sourceName'])
			}
		}
	},
	Mutation: {
		backout: async (_: null, { jobIngestionId }): Promise<boolean> => {
			const statuses = ['processed', 'loaded', 'approved']
			const jobIngestion = await JobIngestion.query().findById(jobIngestionId)
			if (
				!jobIngestion ||
				!jobIngestion.isComplete ||
				!statuses.includes(jobIngestion.jobStatus)
			) {
				return false
			}

			const hotelProjectPropertyList = await HotelProjectProperty.query()
				.distinct('hotelProjectId')
				.where('agencyJobIngestionId', jobIngestion.id)
				.orWhere('ccJobIngestionId', jobIngestion.id)
				.orWhere('supplierJobIngestionId', jobIngestion.id)
			const stageActivityHotelList = await StageActivityHotel.query()
				.where('jobIngestionId', jobIngestion.id)
				.select('id')

			await Promise.all([
				HotelProjectProperty.query()
					.delete()
					.where('agencyJobIngestionId', jobIngestion.id)
					.orWhere('ccJobIngestionId', jobIngestion.id)
					.orWhere('supplierJobIngestionId', jobIngestion.id),
				StageActivityHotelCandidate.query()
					.delete()
					.whereIn(
						'stageActivityHotelId',
						stageActivityHotelList.map((v) => v.id)
					)
			])

			await Promise.all([
				StageActivityHotel.query()
					.delete()
					.where('jobIngestionId', jobIngestion.id),
				JobIngestionHotel.query()
					.delete()
					.where('jobIngestionId', jobIngestion.id),
				HotelProject.query()
					.delete()
					.whereIn(
						'id',
						hotelProjectPropertyList.map((v) => v.hotelProjectId)
					)
			])

			await JobIngestion.query().patchAndFetchById(jobIngestion.id, {
				jobStatus: 'backout'
			})
			return true
		},
		exportActivityDataQc: async (
			_: null,
			{ jobIngestionIds, currencyType },
			{ advito }
		): Promise<string> => {
			const res = await advito.raw(
				`select * from export_stage_activity_hotel_qc(ARRAY [${jobIngestionIds}], '${currencyType}')`
			)
			try {
				return parse(res.rows)
			} catch (err) {
				console.error(err)
				return 'error'
			}
		}
	}
}
