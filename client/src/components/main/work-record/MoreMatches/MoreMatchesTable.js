/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { HOTEL_PROPERTY_LIST } from 'api/queries'
import { Table, Checkbox, Button } from 'antd'
import { columns } from './columns'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'

const MoreMatchesTable = ({
	setMatchedHotel,
	matchedHotel,
	onMatchHotel,
	filters,
}) => {
	const [pageNumber, setPageNumber] = useState(1)
	const { loading, error, data } = useQuery(HOTEL_PROPERTY_LIST, {
		variables: {
			...(filters && {
				...filters,
				...(filters.id && { id: +filters.id }),
			}),
			pageNumber,
		},
		fetchPolicy: 'network-only',
	})

	const onPageChange = (e) => setPageNumber(e)

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
									onChange={() => setMatchedHotel(record.id)}
									checked={matchedHotel === record.id}
								>
									Match to this
								</Checkbox>
							)
						},
					},
				]}
				dataSource={data.hotelPropertyList.data}
				scroll={{ x: 1500, y: 400 }}
				rowKey="id"
				pagination={{
					position: ['bottomLeft'],
					defaultCurrent: 1,
					defaultPageSize: 25,
					showSizeChanger: false,
					current: pageNumber,
					total: data.hotelPropertyList.recordCount,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} items`,
					onChange: onPageChange,
				}}
				style={{ marginTop: '1em' }}
			/>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button type="primary" onClick={onMatchHotel} disabled={!matchedHotel}>
					Match Hotel
				</Button>
			</div>
		</>
	)
}

export default MoreMatchesTable
