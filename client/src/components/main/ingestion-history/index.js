import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { store } from 'context/store'
import { INGESTION_HOTEL_LIST } from 'api/queries'
import { columns } from './columns'
import { Table, Button } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import { Backout } from './buttons/Backout'
import ErrorMessage from 'components/common/ErrorMessage'
import EnhancedQc from './buttons/EnhancedQc'
import ActivityDataQc from './buttons/ActivityDataQc'
import ApproveSourcing from './buttons/ApproveSourcing'
import ApproveDPM from './buttons/ApproveDPM'

const ButtonRow = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-left: auto;
	margin-bottom: 15px;

	> Button {
		margin-left: 10px;
	}
`

const IngestionHistory = () => {
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange } = state
	const [pageNumber, setPageNumber] = useState(1)
	const { loading, error, data, refetch } = useQuery(INGESTION_HOTEL_LIST, {
		variables: {
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
			pageNumber
		},
		fetchPolicy: 'network-only'
	})

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	const onPageChange = (e) => setPageNumber(e)

	const handleEnhancedQc = (currencyType, currencySelection) => {
		console.log(currencyType, currencySelection)
	}

	const handleApprove = () => {
		console.log('Approved')
	}

	return (
		<>
			<ButtonRow>
				<ActivityDataQc />
				<EnhancedQc onClick={handleEnhancedQc} />
				<ApproveDPM onClick={handleApprove} />
				<ApproveSourcing onClick={handleApprove} />
			</ButtonRow>
			<Table
				columns={[
					...columns,
					{
						title: '',
						width: 100,
						fixed: 'right',
						// eslint-disable-next-line react/display-name
						render: (_, record) => <Backout record={record} refetch={refetch} />
					}
				]}
				dataSource={data.ingestionHotelList.data}
				pagination={{
					position: ['bottomLeft'],
					defaultCurrent: 1,
					defaultPageSize: 25,
					showSizeChanger: false,
					current: pageNumber,
					total: data.ingestionHotelList.recordCount,
					onChange: onPageChange
				}}
				scroll={{ x: 1500, y: 700 }}
				rowKey="id"
			/>
			<Button
				disabled={
					!data.ingestionHotelList.data.some(
						(record) =>
							record.statusDpm === 'Loaded' ||
							record.statusSourcing === 'Loaded'
					)
				}
				style={{
					display: 'block',
					width: '220px',
					marginLeft: 'auto',
					marginTop: '1em'
				}}
			>
				Load for Enhanced QC Report
			</Button>
		</>
	)
}

export default IngestionHistory
