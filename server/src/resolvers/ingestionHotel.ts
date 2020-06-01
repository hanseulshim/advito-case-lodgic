import { ApolloError } from 'apollo-server-lambda'
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
					.whereIn(
						'jobStatus',
						process.env.ENVIRONMENT === 'PRODUCTION'
							? ['done', 'ingested', 'processed', 'loaded', 'approved']
							: ['processed', 'loaded', 'approved']
					),
				JobIngestionHotelView.query()
					.count()
					.first()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere('isDpm', true)
					.whereRaw('LOWER("status_dpm") = ?', 'loaded')
					.whereIn(
						'jobStatus',
						process.env.ENVIRONMENT === 'PRODUCTION'
							? ['done', 'ingested', 'processed', 'loaded', 'approved']
							: ['processed', 'loaded', 'approved']
					),
				JobIngestionHotelView.query()
					.count()
					.first()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere('isSourcing', true)
					.whereRaw('LOWER("status_sourcing") = ?', 'loaded')
					.whereIn(
						'jobStatus',
						process.env.ENVIRONMENT === 'PRODUCTION'
							? ['done', 'ingested', 'processed', 'loaded', 'approved']
							: ['processed', 'loaded', 'approved']
					),
				JobIngestionHotelView.query()
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
			])

			return {
				recordCount,
				dpmCount,
				sourcingCount,
				data
			}
		},
		dpmFileList: async (
			_: null,
			{ clientId, startDate, endDate }
		): Promise<string[]> => {
			try {
				const jobIngestionHotel = await JobIngestionHotelView.query()
					.select('jobIngestionId')
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere('isDpm', true)
					.whereRaw('LOWER("status_dpm") = ?', 'loaded')
					.whereIn(
						'jobStatus',
						process.env.ENVIRONMENT === 'PRODUCTION'
							? ['done', 'ingested', 'processed', 'loaded', 'approved']
							: ['processed', 'loaded', 'approved']
					)
				if (!jobIngestionHotel)
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				return jobIngestionHotel.map((job) => job.jobName)
			} catch (e) {
				throw new ApolloError(e.message)
			}
		},
		sourcingFileList: async (
			_: null,
			{ clientId, startDate, endDate }
		): Promise<string[]> => {
			try {
				const jobIngestionHotel = await JobIngestionHotelView.query()
					.select('jobIngestionId')
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere('isSourcing', true)
					.whereRaw('LOWER("status_sourcing") = ?', 'loaded')
					.whereIn(
						'jobStatus',
						process.env.ENVIRONMENT === 'PRODUCTION'
							? ['done', 'ingested', 'processed', 'loaded', 'approved']
							: ['processed', 'loaded', 'approved']
					)
				if (!jobIngestionHotel)
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				return jobIngestionHotel.map((job) => job.jobName)
			} catch (e) {
				throw new ApolloError(e.message)
			}
		}
	},
	Mutation: {
		loadDpm: async (_: null, { jobIngestionId }): Promise<boolean> => {
			try {
				const jobIngestionHotel = await JobIngestionHotel.query().findById(
					jobIngestionId
				)
				if (!jobIngestionHotel)
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				if (
					jobIngestionHotel.isSourcing &&
					jobIngestionHotel.statusSourcing.toLowerCase() === 'loaded'
				)
					throw new ApolloError(
						'Job Ingestion has a sourcing status of loaded.',
						'500'
					)
				if (jobIngestionHotel.isDpm)
					throw new ApolloError(
						'Job Ingestion has already been loaded or approved.',
						'500'
					)
				await JobIngestionHotel.query().findById(jobIngestionId).patch({
					isDpm: true,
					statusDpm: 'Loaded',
					dateStatusDpm: new Date()
				})
				return true
			} catch (e) {
				throw new ApolloError(e.message)
			}
		},
		loadSourcing: async (_: null, { jobIngestionId }): Promise<boolean> => {
			try {
				const jobIngestionHotel = await JobIngestionHotel.query().findById(
					jobIngestionId
				)
				if (!jobIngestionHotel)
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				if (
					jobIngestionHotel.isDpm &&
					jobIngestionHotel.statusDpm.toLowerCase() === 'loaded'
				)
					throw new ApolloError(
						'Job Ingestion has a DPM status of loaded.',
						'500'
					)
				if (jobIngestionHotel.isSourcing)
					throw new ApolloError(
						'Job Ingestion has already been loaded or approved.',
						'500'
					)
				await JobIngestionHotel.query().findById(jobIngestionId).patch({
					isSourcing: true,
					statusSourcing: 'Loaded',
					dateStatusSourcing: new Date()
				})
				return true
			} catch (e) {
				throw new ApolloError(e.message)
			}
		},
		approveDpm: async (
			_: null,
			{ clientId, startDate, endDate }
		): Promise<boolean> => {
			try {
				const jobIngestionHotel = await JobIngestionHotelView.query()
					.select('jobIngestionId')
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere('isDpm', true)
					.whereRaw('LOWER("status_dpm") = ?', 'loaded')
					.whereIn(
						'jobStatus',
						process.env.ENVIRONMENT === 'PRODUCTION'
							? ['done', 'ingested', 'processed', 'loaded', 'approved']
							: ['processed', 'loaded', 'approved']
					)
				if (!jobIngestionHotel || jobIngestionHotel.length === 0)
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				await JobIngestionHotel.query()
					.patch({
						isDpm: true,
						statusDpm: 'Approved',
						dateStatusDpm: new Date()
					})
					.whereIn(
						'jobIngestionId',
						jobIngestionHotel.map((job) => job.jobIngestionId)
					)
				return true
			} catch (e) {
				throw new ApolloError(e.message)
			}
		},
		approveSourcing: async (
			_: null,
			{ clientId, startDate, endDate }
		): Promise<boolean> => {
			try {
				const jobIngestionHotel = await JobIngestionHotelView.query()
					.select('jobIngestionId')
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere('isSourcing', true)
					.whereRaw('LOWER("status_sourcing") = ?', 'loaded')
					.whereIn(
						'jobStatus',
						process.env.ENVIRONMENT === 'PRODUCTION'
							? ['done', 'ingested', 'processed', 'loaded', 'approved']
							: ['processed', 'loaded', 'approved']
					)
				if (!jobIngestionHotel || jobIngestionHotel.length === 0)
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				await JobIngestionHotel.query()
					.patch({
						isSourcing: true,
						statusSourcing: 'Approved',
						dateStatusSourcing: new Date()
					})
					.whereIn(
						'jobIngestionId',
						jobIngestionHotel.map((job) => job.jobIngestionId)
					)
				return true
			} catch (e) {
				throw new ApolloError(e.message)
			}
		},
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
			{ currencyType },
			{ advito }
		): Promise<string> => {
			const res = await advito.raw(
				`select * from export_stage_activity_hotel_qc('${currencyType}')`
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
