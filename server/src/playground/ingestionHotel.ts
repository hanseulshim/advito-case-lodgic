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
      
      approveFileList(
        clientId: 348
        startDate: "2020-01-01"
        endDate: "2020-12-31"
        type: ""
      )
    }`
	},
	Mutation: {
		name: 'Ingestion Hotel Mutation',
		endpoint: getEndpoint(),
		headers: { Authorization: 'MY^PR3TTYP0NY' },
		query: `
      mutation {
        # loadEnhancedQcReport(jobIngestionIds: [], type: "", year: 2020, month: null)
        # approveFiles(clientId: 348
        #   startDate: "2020-01-01"
        #   endDate: "2020-12-31"
        #   type: "dpm")
        # backout(jobIngestionId: null)
        # exportActivityDataQc(clientId: 348, dataStartDate: "01-01-2020", dataEndDate: "12-31-2020", currencyType: "usd")
        # exportEnhancedQC(clientId: 348, dataStartDate: "01-01-2020", dataEndDate: "12-31-2020", currencyType: "usd")
      }`
	}
}
