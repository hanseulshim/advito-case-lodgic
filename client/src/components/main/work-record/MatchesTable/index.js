/* eslint-disable react/display-name */
import React from 'react'
import { useQuery } from '@apollo/client'
import { UNMATCHED_HOTEL_CONFIDENCE_LIST } from 'api/queries'
import { columns } from './columns'
import { Table, Checkbox, Button } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'

const MatchesTable = ({ recordId, onMatchHotel, matchedHotel }) => {
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
				columns={[
					...columns,
					{
						title: 'Actions',
						width: 150,
						fixed: 'right',
						render: (record) => {
							return (
								<Checkbox
									onChange={() => onMatchHotel(record.hotelPropertyId)}
									checked={matchedHotel === record.hotelPropertyId}
								>
									Match to this
								</Checkbox>
							)
						},
					},
				]}
				dataSource={data.unmatchedHotelConfidenceList}
				scroll={{ x: 1500, y: 700 }}
				rowKey="id"
				pagination={false}
			/>
			<div
				style={{
					marginTop: '1em',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button
					type="primary"
					onClick={() =>
						alert(`Matched this record with HMFID: ${matchedHotel}`)
					}
					disabled={!matchedHotel}
				>
					Match Hotel
				</Button>
			</div>
		</>
	)
}

export default MatchesTable
