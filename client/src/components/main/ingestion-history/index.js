import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/client'
import { store } from 'context/store'
import { INGESTION_HOTEL_LIST, CHECK_LOAD_ENHANCED_QC_REPORT } from 'api'
import { columns } from './columns'
import { Table, Modal } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import LoadActions from './actions/LoadActions'
import Backout from './actions/Backout'
import ErrorMessage from 'components/common/ErrorMessage'
import EnhancedQc from './actions/EnhancedQc'
import ActivityDataQc from './actions/ActivityDataQc'
import ApproveSourcing from './actions/ApproveSourcing'
import ApproveDPM from './actions/ApproveDPM'
import LoadEnhancedQc from './actions/LoadEnhancedQc'
import './columns.scss'

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
	const [selectedRecords, setSelectedRecords] = useState([])
	const [pollCount, setPollCount] = useState(0)
	const jobIngestionIds = selectedRecords.length
		? selectedRecords.map((record) => record.jobIngestionId)
		: []
	const type = selectedRecords.length
		? selectedRecords[0].type.toLowerCase()
		: null

	const { loading, error, data, refetch } = useQuery(INGESTION_HOTEL_LIST, {
		variables: {
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
			pageNumber
		},
		fetchPolicy: 'network-only'
	})

	const [
		checkLoadStatus,
		{ data: loadStatus, stopPolling, called, startPolling }
	] = useLazyQuery(CHECK_LOAD_ENHANCED_QC_REPORT, {
		notifyOnNetworkStatusChange: true,
		variables: {
			jobIngestionIds,
			// Easter Egg for the lads
			type: type || 'swag'
		},
		onError: (e) => {
			if (pollCount > 0) {
				erasePoll()
				Modal.error({
					title: 'Error in Loading For Enhanced QC Report',
					content: e.message
				})
			}
		},
		fetchPolicy: 'network-only'
	})

	const onPageChange = (e) => setPageNumber(e)

	const erasePoll = () => {
		setPollCount(0)
		stopPolling()
		setSelectedRecords([])
		refetch()
	}

	if (called && loadStatus && pollCount === 1) {
		startPolling(3000)
		setPollCount(pollCount + 1)
	} else if (
		loadStatus &&
		loadStatus.checkLoadEnhancedQcReport &&
		selectedRecords.length > 0 &&
		pollCount > 0
	) {
		erasePoll()
	}

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />
	return (
		<div style={{ paddingBottom: '2em' }}>
			<ButtonRow>
				<ActivityDataQc />
				<EnhancedQc />
				<ApproveDPM
					refetchIngestionHistory={refetch}
					ingestionHotelList={data.ingestionHotelList}
				/>
				<ApproveSourcing
					refetchIngestionHistory={refetch}
					ingestionHotelList={data.ingestionHotelList}
				/>
			</ButtonRow>
			<Table
				columns={[
					...columns,
					{
						title: 'Load Actions',
						width: 200,
						fixed: 'right',
						// eslint-disable-next-line react/display-name
						render: (_, record) => (
							<LoadActions
								record={record}
								selectedRecords={selectedRecords}
								setSelectedRecords={setSelectedRecords}
							/>
						)
					},
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
			<LoadEnhancedQc
				selectedRecords={selectedRecords}
				setSelectedRecords={setSelectedRecords}
				refetch={refetch}
				checkLoadStatus={checkLoadStatus}
				setPolling={setPollCount}
			/>
			<Modal visible={pollCount > 0} closable={false} footer={null}>
				<p>
					We are currently loading your selected files. This can take up to a
					minute...
				</p>
				<SpinLoader />
			</Modal>
		</div>
	)
}

export default IngestionHistory
