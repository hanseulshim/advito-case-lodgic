/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { UNMATCHED_HOTEL_CONFIDENCE_LIST } from 'api/queries'
import { columns } from './columns'
import { Table, Checkbox, Button } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'

const MatchesTable = ({ recordId }) => {
	const { loading, error, data } = useQuery(UNMATCHED_HOTEL_CONFIDENCE_LIST, {
		variables: {
			stageActivityHotelId: recordId,
		},
		fetchPolicy: 'network-only',
	})
	const [matchHotelId, setMatchHotelId] = useState(null)

	const onMatchHotel = (id) => {
		if (id == matchHotelId) {
			setMatchHotelId(null)
		} else setMatchHotelId(id)
	}

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
									onChange={() => onMatchHotel(record.id)}
									checked={matchHotelId === record.id}
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
					onClick={() => alert(`Matched with Hotel: ${matchHotelId}!`)}
					disabled={!matchHotelId}
				>
					Match Hotel
				</Button>
			</div>
		</>
	)
}

export default MatchesTable
