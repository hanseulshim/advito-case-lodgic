import React from 'react'
import { useQuery } from '@apollo/client'
import { UNMATCHED_HOTEL_CONFIDENCE_LIST } from 'api/queries'
import { columns } from './columns'
import { Table } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'

const MatchesTable = ({ recordId }) => {
	const { loading, error, data } = useQuery(UNMATCHED_HOTEL_CONFIDENCE_LIST, {
		variables: {
			stageActivityHotelId: recordId,
		},
		fetchPolicy: 'network-only',
	})

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	return (
		<>
			<Table
				columns={columns}
				dataSource={data.unmatchedHotelConfidenceList.data}
				scroll={{ x: 1500, y: 700 }}
				rowKey="id"
			/>
		</>
	)
}

export default MatchesTable
