import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'
import { INGESTION_HOTEL_LIST } from 'api/queries'
import { columns } from './columns'
import { Table } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import ButtonRow from './ButtonRow'

const IngestionHistory = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange } = state
	const [pageNumber, setPageNumber] = useState(1)
	const { loading, error, data } = useQuery(INGESTION_HOTEL_LIST, {
		variables: {
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
			pageNumber,
		},
		fetchPolicy: 'network-only',
	})

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	const onPageChange = (e) => setPageNumber(e)

	return (
		<>
			<ButtonRow />
			<Table
				columns={columns}
				dataSource={data.ingestionHotelList.data}
				pagination={{
					position: ['bottomLeft'],
					defaultCurrent: 1,
					defaultPageSize: 25,
					showSizeChanger: false,
					current: pageNumber,
					total: data.ingestionHotelList.pageCount * 25,
					onChange: onPageChange,
				}}
				scroll={{ x: 1500, y: 700 }}
				rowKey="id"
			/>
		</>
	)
}

export default IngestionHistory
