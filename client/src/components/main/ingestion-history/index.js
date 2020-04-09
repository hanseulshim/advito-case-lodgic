import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'
import { INGESTION_HOTEL_LIST } from 'api/queries'
import { columns } from './columns'
import { Table } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'

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

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	return (
		<>
			<Table
				columns={columns}
				dataSource={data.ingestionHotelList.data}
				scroll={{ x: 1500, y: 300 }}
				pagination={{ position: ['topLeft', 'bottomLeft'] }}
				rowKey="id"
			/>
		</>
	)
}

export default IngestionHistory
