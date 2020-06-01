import { getEndpoint } from '../utils'

export default {
	Query: {
		name: 'Ingestion Hotel Query',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
    {
			ingestionHotelList(
        clientId: 348
        startDate: "2020-01-01"
        endDate: "2020-12-31"
        pageNumber: null
      ) {
        recordCount
        dpmCount
        sourcingCount
        data {
          id
          jobIngestionId
          templateNote
          templateCategory
          jobName
          sourceName
          loadedBy
          dataStartDate
          dataEndDate
          uploadTimestamp
          roomNightsTotal
          ingestedRoomSpend
          currencyIngested
          convertedRoomSpendUsd
          convertedAbrUsd
          conversionDate
          countRows
          unmatchedCount
          unmatchedSpendPercent
          isDpm
          statusDpm
          dateStatusDpm
          isSourcing
          statusSourcing
          dateStatusSourcing
        }
			}
    }`
	},
	Mutation: {
		name: 'Ingestion Hotel Mutation',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
      mutation {
        backout(jobIngestionId: null)
        exportActivityDataQc(currencyType: "usd")
      }`
	}
}
