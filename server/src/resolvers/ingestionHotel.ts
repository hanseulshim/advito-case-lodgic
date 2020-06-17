import { ApolloError } from 'apollo-server-lambda'
import AWS from 'aws-sdk'
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

const lambda = new AWS.Lambda({
	region: 'us-east-2',
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY
})

const statuses = ['processed', 'loaded', 'approved']

export default {
	Query: {
		ingestionHotelList: async (
			_: null,
			{ clientId, startDate, endDate, pageNumber = 0 }
		): Promise<JobIngestionHotelType> => {
			const LIMIT = 25
			const OFFSET = Math.max(0, +pageNumber - 1) * LIMIT
			const [
				{ count: recordCount },
				{ count: dpmCount },
				{ count: sourcingCount },
				data
			] = await Promise.all([
				JobIngestionHotelView.query()
					.count()
					.first()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.whereIn('jobStatus', statuses),
				JobIngestionHotelView.query()
					.count()
					.first()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere('isDpm', true)
					.whereRaw('LOWER("status_dpm") = ?', 'loaded')
					.whereIn('jobStatus', statuses),
				JobIngestionHotelView.query()
					.count()
					.first()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere('isSourcing', true)
					.whereRaw('LOWER("status_sourcing") = ?', 'loaded')
					.whereIn('jobStatus', statuses),
				JobIngestionHotelView.query()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.whereIn('jobStatus', statuses)
					.offset(OFFSET)
					.limit(LIMIT)
					.orderBy(['dataStartDate', 'templateCategory', 'sourceName'])
			])

			return {
				recordCount,
				dpmCount,
				sourcingCount,
				data
			}
		},
		approveFileList: async (
			_: null,
			{ clientId, startDate, endDate, type }
		): Promise<string[]> => {
			try {
				if (type.toLowerCase() !== 'dpm' && type.toLowerCase() !== 'sourcing') {
					throw new ApolloError('Type must be either dpm or sourcing', '500')
				}
				const property = type.toLowerCase() === 'dpm' ? 'isDpm' : 'isSourcing'
				const status =
					type.toLowerCase() === 'dpm' ? 'status_dpm' : 'status_sourcing'
				const jobIngestionHotel = await JobIngestionHotelView.query()
					.select('jobName')
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere(property, true)
					.whereRaw(`LOWER("${status}") = ?`, 'loaded')
					.whereIn('jobStatus', statuses)
				if (!jobIngestionHotel)
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				return jobIngestionHotel.map((job) => job.jobName)
			} catch (e) {
				throw new ApolloError(e.message, '500')
			}
		},
		checkLoadEnhancedQcReport: async (
			_: null,
			{ jobIngestionIds, type }
		): Promise<boolean> => {
			try {
				if (type.toLowerCase() === 'swag') return true
				if (type.toLowerCase() !== 'dpm' && type.toLowerCase() !== 'sourcing') {
					throw new ApolloError('Type must be either dpm or sourcing', '500')
				}
				const property = type.toLowerCase() === 'dpm' ? 'isDpm' : 'isSourcing'
				const status =
					type.toLowerCase() === 'dpm' ? 'statusDpm' : 'statusSourcing'
				const jobIngestionHotels = await JobIngestionHotelView.query().whereIn(
					'jobIngestionId',
					jobIngestionIds
				)
				if (!jobIngestionHotels || jobIngestionHotels.length === 0) {
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				}
				if (
					jobIngestionHotels.some(
						(hotel) =>
							typeof hotel.ingestionNote === 'string' &&
							hotel.ingestionNote.includes('error')
					) &&
					jobIngestionHotels.filter(
						(hotel) =>
							(typeof hotel.ingestionNote === 'string' &&
								hotel.ingestionNote.includes('error')) ||
							(hotel[property] && hotel[status].toLowerCase() === 'loaded')
					).length === jobIngestionHotels.length
				) {
					throw new ApolloError(
						`Failed to load enhanced qc report for these hotels: ${jobIngestionHotels
							.filter(
								(hotel) =>
									typeof hotel.ingestionNote === 'string' &&
									hotel.ingestionNote.includes('error')
							)
							.map((hotel) => hotel.jobIngestionId)}`,
						'500'
					)
				}
				return jobIngestionHotels.every(
					(hotel) => hotel[property] && hotel[status].toLowerCase() === 'loaded'
				)
			} catch (e) {
				throw new ApolloError(e.message, '500')
			}
		}
	},
	Mutation: {
		loadEnhancedQcReport: async (
			_: null,
			{ jobIngestionIds, type, year, month }
		): Promise<boolean> => {
			try {
				if (type.toLowerCase() !== 'dpm' && type.toLowerCase() !== 'sourcing') {
					throw new ApolloError('Type must be either dpm or sourcing', '500')
				}
				const date = new Date()
				if (year > date.getFullYear() + 1 || year < date.getFullYear() - 5) {
					throw new ApolloError(
						'Year must be within valid range (within past 5 years or 1 year from now)',
						'500'
					)
				}
				if (
					(type.toLowerCase() === 'dpm' && month < 1) ||
					(type.toLowerCase() === 'dpm' && month > 12)
				) {
					throw new ApolloError('DPM types must have a valid month', '500')
				}
				const property = type.toLowerCase() === 'dpm' ? 'isDpm' : 'isSourcing'
				// const status =
				// 	type.toLowerCase() === 'dpm' ? 'statusDpm' : 'statusSourcing'
				// const dateStatus =
				// 	type.toLowerCase() === 'dpm' ? 'dateStatusDpm' : 'dateStatusSourcing'
				const otherProperty =
					type.toLowerCase() === 'dpm' ? 'isSourcing' : 'isDpm'
				const otherStatus =
					type.toLowerCase() === 'dpm' ? 'statusSourcing' : 'statusDpm'
				const jobIngestionHotels = await JobIngestionHotelView.query().whereIn(
					'jobIngestionId',
					jobIngestionIds
				)
				if (!jobIngestionHotels || jobIngestionHotels.length === 0) {
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				} else if (
					jobIngestionHotels.some(
						(hotel) =>
							hotel[otherProperty] &&
							hotel[otherStatus].toLowerCase() === 'loaded'
					)
				) {
					throw new ApolloError(
						'A job ingestion hotel has a sourcing status of loaded.',
						'500'
					)
				} else if (jobIngestionHotels.some((hotel) => hotel[property])) {
					throw new ApolloError(
						'A job ingestion hotel has already been loaded or approved.',
						'500'
					)
				}
				jobIngestionHotels.forEach((hotel) => {
					const params = {
						FunctionName:
							process.env.ENVIRONMENT === 'PRODUCTION'
								? 'advito-ingestion-production-load-enhanced-qc'
								: process.env.ENVIRONMENT === 'STAGING'
								? 'advito-ingestion-staging-load-enhanced-qc'
								: 'advito-ingestion-dev-load-enhanced-qc',
						InvocationType: 'Event',
						Payload: JSON.stringify({
							jobIngestionHotel: {
								jobIngestionId: hotel.jobIngestionId,
								clientId: hotel.clientId,
								year,
								month: month ? month : 'NULL',
								type: type.toLowerCase()
							}
						})
					}
					lambda.invoke(params, function (err) {
						if (err) {
							throw Error(err.message)
						}
					})
				})
				// await Promise.all(
				// 	jobIngestionHotels.map((hotel) =>
				// 		advito.raw(
				// 			`select * from load_for_sourcing_dpm(${hotel.jobIngestionId}, ${
				// 				hotel.clientId
				// 			}, ${year}, ${month ? month : 'NULL'}, '${type.toLowerCase()}')`
				// 		)
				// 	)
				// )
				// await Promise.all([
				// 	JobIngestionHotel.query()
				// 		.patch({
				// 			[property]: true,
				// 			[status]: 'Loaded',
				// 			[dateStatus]: new Date()
				// 		})
				// 		.whereIn('jobIngestionId', jobIngestionIds),
				// 	JobIngestion.query()
				// 		.patch({
				// 			jobStatus: 'loaded'
				// 		})
				// 		.whereIn('id', jobIngestionIds)
				// ])
				return true
			} catch (e) {
				throw new ApolloError(e.message, '500')
			}
		},
		approveFiles: async (
			_: null,
			{ clientId, startDate, endDate, type },
			{ advito }
		): Promise<boolean> => {
			try {
				if (type.toLowerCase() !== 'dpm' && type.toLowerCase() !== 'sourcing') {
					throw new ApolloError('Type must be either dpm or sourcing', '500')
				}
				const property = type.toLowerCase() === 'dpm' ? 'isDpm' : 'isSourcing'
				const status =
					type.toLowerCase() === 'dpm' ? 'statusDpm' : 'statusSourcing'
				const statusCol =
					type.toLowerCase() === 'dpm' ? 'status_dpm' : 'status_sourcing'
				const dateStatus =
					type.toLowerCase() === 'dpm' ? 'dateStatusDpm' : 'dateStatusSourcing'
				const jobIngestionHotels = await JobIngestionHotelView.query()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere(property, true)
					.whereRaw(`LOWER("${statusCol}") = ?`, 'loaded')
					.whereIn('jobStatus', statuses)
				if (!jobIngestionHotels || jobIngestionHotels.length === 0)
					throw new ApolloError('Job Ingestion Hotel not found', '500')

				const jobIngestionIds = jobIngestionHotels.map(
					(job) => job.jobIngestionId
				)
				await Promise.all(
					jobIngestionHotels.map((hotel) =>
						advito.raw(
							`select * from approve_for_sourcing_dpm(
								${hotel.jobIngestionId}, ${hotel.clientId},'${type.toLowerCase()}'
							)`
						)
					)
				)
				await Promise.all([
					JobIngestionHotel.query()
						.patch({
							[property]: true,
							[status]: 'Approved',
							[dateStatus]: new Date()
						})
						.whereIn('jobIngestionId', jobIngestionIds),
					JobIngestion.query()
						.patch({
							jobStatus: 'approved'
						})
						.whereIn('id', jobIngestionIds)
				])
				return true
			} catch (e) {
				throw new ApolloError(e.message, '500')
			}
		},
		backout: async (_: null, { jobIngestionId }): Promise<boolean> => {
			const jobIngestion = await JobIngestion.query().findById(jobIngestionId)
			if (
				!jobIngestion ||
				!jobIngestion.isComplete ||
				!statuses.includes(jobIngestion.jobStatus)
			) {
				throw new ApolloError('Job Ingestion Hotel not found', '500')
			} else if (!statuses.includes(jobIngestion.jobStatus)) {
				throw new ApolloError(
					'Job Ingestion does not have status of complete',
					'500'
				)
			} else if (!statuses.includes(jobIngestion.jobStatus)) {
				throw new ApolloError(
					'Job Ingestion does not have one of the following status: processed, loaded, approved.',
					'500'
				)
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
					),
				JobIngestion.query().patchAndFetchById(jobIngestion.id, {
					jobStatus: 'backout'
				})
			])
			return true
		},
		exportActivityDataQc: async (
			_: null,
			{ clientId, dataStartDate, dataEndDate, currencyType },
			{ advito }
		): Promise<string> => {
			const res = await advito.raw(
				`select * from export_stage_activity_hotel_qc(${clientId}, '${dataStartDate}'::date, '${dataEndDate}'::date, '${currencyType}')`
			)
			try {
				return res.rows.length ? parse(res.rows) : ''
			} catch (err) {
				throw new ApolloError(err.message, '500')
			}
		},
		exportEnhancedQC: async (
			_: null,
			{ clientId, dataStartDate, dataEndDate, currencyType },
			{ advito }
		): Promise<string> => {
			const res = await advito.raw(
				`select * from export_stage_activity_hotel_qc(${clientId}, '${dataStartDate}'::date, '${dataEndDate}'::date, '${currencyType}')`
			)
			try {
				return res.rows.length ? parse(res.rows) : ''
			} catch (err) {
				throw new ApolloError(err.message, '500')
			}
		}
	}
}
