import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { PageHeader, Row, Statistic, Pagination } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import { UNMATCHED_HOTEL } from 'api/queries'
import { getFieldOrder, formatTitle, formatPhoneNumber } from './helper'
import { formatNum } from 'helper'
import './styles.scss'

const RecordHeader = ({ recordId }) => {
	let history = useHistory()
	const { loading, error, data } = useQuery(UNMATCHED_HOTEL, {
		variables: {
			id: recordId,
		},
		fetchPolicy: 'network-only',
	})

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	// const onPageChange = () => {}

	return (
		<PageHeader
			title="Work Record"
			onBack={() => history.push('/unmatched-hotels')}
			// extra={[
			// 	<Pagination
			// 		key="pagination"
			// 		simple
			// 		size="small"
			// 		total={50}
			// 		showTotal={(total) => `Record ${1} of ${total} items`}
			// 		onChange={onPageChange}
			// 	/>,
			// ]}
		>
			<Row>
				{getFieldOrder().map((field, i) => {
					return (
						<Statistic
							title={formatTitle(field)}
							key={'field' + i}
							value={data.unmatchedHotel[field]}
							style={{ marginRight: '2em', marginBottom: '1em' }}
							valueStyle={{ fontSize: '1.25em' }}
							formatter={(value) =>
								field === 'phoneNumber'
									? formatPhoneNumber(value)
									: field === 'roomSpend'
									? formatNum(value)
									: value
							}
							prefix={field === 'roomSpend' ? '$' : null}
						/>
					)
				})}
			</Row>
		</PageHeader>
	)
}

export default RecordHeader
