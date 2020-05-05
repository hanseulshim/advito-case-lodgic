import React, { useState, useContext, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { store } from 'context/store'
import { UNMATCHED_HOTEL_LIST, UNMATCHED_HOTEL } from 'api/queries'
import { columns } from './columns'
import { Table, Button } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'

const UnmatchedHotelsTable = () => {
	let history = useHistory()
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange, filters } = state
	const [pageNumber, setPageNumber] = useState(1)

	const { loading, error, data } = useQuery(UNMATCHED_HOTEL_LIST, {
		variables: {
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
			pageNumber,
			...(filters.hotelName && { hotelName: filters.hotelName }),
			...(filters.templateCategory && {
				templateCategory: filters.templateCategory,
			}),
			...(filters.sourceName && { sourceName: filters.sourceName }),
			...(filters.cityName && { cityName: filters.cityName }),
			...(filters.sortType && { sortType: filters.sortType }),
		},
		fetchPolicy: 'network-only',
	})

	const [loadFirstRecord] = useLazyQuery(UNMATCHED_HOTEL, {
		variables: {
			id: null,
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
			pageNumber,
			...(filters.hotelName && { hotelName: filters.hotelName }),
			...(filters.templateCategory && {
				templateCategory: filters.templateCategory,
			}),
			...(filters.sourceName && { sourceName: filters.sourceName }),
			...(filters.cityName && { cityName: filters.cityName }),
			...(filters.sortType && { sortType: filters.sortType }),
		},
		fetchPolicy: 'network-only',
		onCompleted: (data) =>
			history.push(`work-record/${data.unmatchedHotel.data.id}`),
		onError: (error) => console.log(`Error grabbing ID!:${error}`),
	})

	useEffect(() => {
		//Check if filters were changed. If so, return to page 1.
		onPageChange(1)
	}, [filters])

	const onPageChange = (e) => setPageNumber(e)

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	return (
		<>
			<Table
				columns={columns}
				dataSource={data.unmatchedHotelList.data}
				pagination={{
					position: ['bottomLeft'],
					defaultCurrent: 1,
					defaultPageSize: 25,
					showSizeChanger: false,
					current: pageNumber,
					total: data.unmatchedHotelList.recordCount,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} items`,
					onChange: onPageChange,
				}}
				scroll={{ x: 1500, y: 700 }}
				rowKey="id"
			/>
			<Button
				type="primary"
				onClick={() => loadFirstRecord()}
				style={{ marginLeft: '87.25%', position: 'relative', bottom: '3.5em' }}
			>
				Work Records
			</Button>
		</>
	)
}

export default UnmatchedHotelsTable
