import { ApolloError } from 'apollo-server-lambda'
import AWS from 'aws-sdk'
import {
	ExportQc,
	JobIngestion,
	JobIngestionHotelView,
	JobIngestionHotel
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
		},
		checkApproveFiles: async (
			_: null,
			{ clientId, startDate, endDate, type }
		): Promise<boolean> => {
			try {
				if (type.toLowerCase() === 'swag') return true
				if (type.toLowerCase() !== 'dpm' && type.toLowerCase() !== 'sourcing') {
					throw new ApolloError('Type must be either dpm or sourcing', '500')
				}
				const property = type.toLowerCase() === 'dpm' ? 'isDpm' : 'isSourcing'
				const status =
					type.toLowerCase() === 'dpm' ? 'statusDpm' : 'statusSourcing'
				const statusCol =
					type.toLowerCase() === 'dpm' ? 'status_dpm' : 'status_sourcing'
				const jobIngestionHotels = await JobIngestionHotelView.query()
					.select()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere(property, true)
					.whereRaw(`LOWER("${statusCol}") = ?`, 'approved')
					.whereIn('jobStatus', statuses)
				if (!jobIngestionHotels || jobIngestionHotels.length === 0) {
					return false
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
							(hotel[property] && hotel[status].toLowerCase() === 'approved')
					).length === jobIngestionHotels.length
				) {
					throw new ApolloError(
						`Failed to approve files for these hotels: ${jobIngestionHotels
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
					(hotel) =>
						hotel[property] && hotel[status].toLowerCase() === 'approved'
				)
			} catch (e) {
				throw new ApolloError(e.message, '500')
			}
		},
		checkBackout: async (_: null, { jobIngestionId }): Promise<boolean> => {
			try {
				const job = await JobIngestion.query().findById(jobIngestionId)
				if (!job) {
					throw new ApolloError('Job Ingestion not found', '500')
				}
				return job.jobStatus === 'backout'
			} catch (e) {
				throw new ApolloError(e)
			}
		},
		checkExportActivityDataQc: async (
			_: null,
			{ jobIngestionIds }
		): Promise<string> => {
			try {
				const exportQc = await ExportQc.query()
					.select()
					.where('jobIngestionIds', jobIngestionIds.sort().join(', '))
					.first()
				if (!exportQc) {
					return null
				}
				await ExportQc.query().deleteById(exportQc.id)
				return exportQc.exportData
			} catch (e) {
				throw new ApolloError(e)
			}
		},
		checkExportEnhancedQC: async (
			_: null,
			{ clientId, dataStartDate, dataEndDate }
		): Promise<string> => {
			try {
				const exportQc = await ExportQc.query()
					.select()
					.where('clientId', clientId)
					.andWhere('exportType', 'enhanced')
					.andWhere('dataStartDate', dataStartDate)
					.andWhere('dataEndDate', dataEndDate)
					.first()
				if (!exportQc) {
					return null
				}
				await ExportQc.query().deleteById(exportQc.id)
				return exportQc.exportData
			} catch (e) {
				throw new ApolloError(e)
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
				await JobIngestionHotel.query()
					.patch({ ingestionNote: '' })
					.whereIn('jobIngestionId', jobIngestionIds)
				const clientId = jobIngestionHotels[0].clientId
				const params = {
					FunctionName:
						process.env.ENVIRONMENT === 'PRODUCTION'
							? 'advito-ingestion-production-load-enhanced-qc'
							: process.env.ENVIRONMENT === 'STAGING'
							? 'advito-ingestion-staging-load-enhanced-qc'
							: 'advito-ingestion-dev-load-enhanced-qc',
					InvocationType: 'Event',
					Payload: JSON.stringify({
						jobIngestionIds: jobIngestionIds,
						clientId: clientId,
						year,
						month: month ? month : 'NULL',
						type: type.toLowerCase()
					})
				}
				lambda.invoke(params, function (err) {
					if (err) {
						throw Error(err.message)
					}
				})
				return true
			} catch (e) {
				throw new ApolloError(e.message, '500')
			}
		},
		approveFiles: async (
			_: null,
			{ clientId, startDate, endDate, type },
			{ user }
		): Promise<boolean> => {
			try {
				if (type.toLowerCase() !== 'dpm' && type.toLowerCase() !== 'sourcing') {
					throw new ApolloError('Type must be either dpm or sourcing', '500')
				}
				const property = type.toLowerCase() === 'dpm' ? 'isDpm' : 'isSourcing'
				const statusCol =
					type.toLowerCase() === 'dpm' ? 'status_dpm' : 'status_sourcing'
				const jobIngestionHotels = await JobIngestionHotelView.query()
					.select()
					.where('clientId', clientId)
					.andWhere('dataStartDate', '>=', startDate)
					.andWhere('dataEndDate', '<=', endDate)
					.andWhere('isComplete', true)
					.andWhere(property, true)
					.whereRaw(`LOWER("${statusCol}") = ?`, 'loaded')
					.whereIn('jobStatus', statuses)
				if (!jobIngestionHotels || jobIngestionHotels.length === 0) {
					throw new ApolloError('Job Ingestion Hotel not found', '500')
				}

				const jobIngestionIds = jobIngestionHotels.map((hotel) => hotel.id)

				const params = {
					FunctionName:
						process.env.ENVIRONMENT === 'PRODUCTION'
							? 'advito-ingestion-production-approve-file'
							: process.env.ENVIRONMENT === 'STAGING'
							? 'advito-ingestion-staging-approve-file'
							: 'advito-ingestion-dev-approve-file',
					InvocationType: 'Event',
					Payload: JSON.stringify({
						jobIngestionIds,
						clientId: clientId,
						type: type.toLowerCase(),
						userId: user.id
					})
				}
				await lambda.invoke(params).promise()
				return true
			} catch (e) {
				throw new ApolloError(e.message, '500')
			}
		},
		backout: async (_: null, { jobIngestionId }): Promise<boolean> => {
			try {
				const params = {
					FunctionName:
						process.env.ENVIRONMENT === 'PRODUCTION'
							? 'advito-ingestion-production-backout'
							: process.env.ENVIRONMENT === 'STAGING'
							? 'advito-ingestion-staging-backout'
							: 'advito-ingestion-dev-backout',
					InvocationType: 'Event',
					Payload: JSON.stringify({
						jobIngestionId
					})
				}
				await lambda.invoke(params).promise()
				return true
			} catch (e) {
				throw new ApolloError(e, '500')
			}
		},
		exportActivityDataQc: async (
			_: null,
			{ jobIngestionIds, currencyType }
		): Promise<boolean> => {
			try {
				if (currencyType !== 'ingested' && currencyType !== 'usd') {
					throw new ApolloError(
						'currency type must be either ingested or usd',
						'500'
					)
				}
				const params = {
					FunctionName:
						process.env.ENVIRONMENT === 'PRODUCTION'
							? 'advito-ingestion-production-export-activity-data-qc'
							: process.env.ENVIRONMENT === 'STAGING'
							? 'advito-ingestion-staging-export-activity-data-qc'
							: 'advito-ingestion-dev-export-activity-data-qc',
					InvocationType: 'Event',
					Payload: JSON.stringify({
						jobIngestionIds,
						currencyType
					})
				}
				await lambda.invoke(params).promise()
				return true
			} catch (err) {
				throw new ApolloError(err.message, '500')
			}
		},
		exportEnhancedQC: async (
			_: null,
			{ clientId, dataStartDate, dataEndDate, currencyType }
		): Promise<boolean> => {
			try {
				const params = {
					FunctionName:
						process.env.ENVIRONMENT === 'PRODUCTION'
							? 'advito-ingestion-production-export-enhanced-qc'
							: process.env.ENVIRONMENT === 'STAGING'
							? 'advito-ingestion-staging-export-enhanced-qc'
							: 'advito-ingestion-dev-export-enhanced-qc',
					InvocationType: 'Event',
					Payload: JSON.stringify({
						clientId,
						dataStartDate,
						dataEndDate,
						currencyType
					})
				}
				await lambda.invoke(params).promise()
				return true
			} catch (err) {
				throw new ApolloError(err.message, '500')
			}
		}
	}
}
