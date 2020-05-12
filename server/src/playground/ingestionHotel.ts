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
        data {
          id
          jobIngestionId
          templateNote
          templateCategory
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
	}
}
