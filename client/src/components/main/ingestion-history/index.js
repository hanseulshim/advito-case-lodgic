import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'
import { INGESTION_HOTEL_LIST } from 'api/queries'

const IngestionHistory = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange } = state
	const { loading, error, data } = useQuery(INGESTION_HOTEL_LIST, {
		variables: {
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
			pageNumber: null,
		},
		fetchPolicy: 'network-only',
	})

	return (
		<>
			<div>Ingestion History!</div>
		</>
	)
}

export default IngestionHistory
