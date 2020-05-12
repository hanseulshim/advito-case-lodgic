import React, { useContext } from 'react'
import { store } from 'context/store'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { PageHeader, Row, Statistic, Pagination } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import { UNMATCHED_HOTEL } from 'api/queries'
import { getFieldOrder, formatTitle } from './helper'
import { formatNum } from 'helper'
import './styles.scss'

const RecordHeader = ({ recordIndex }) => {
	let history = useHistory()
	const globalState = useContext(store)
	const { state } = globalState
	const { clientId, dateRange, filters } = state
	const { loading, error, data } = useQuery(UNMATCHED_HOTEL, {
		variables: {
			currPosition: recordIndex,
			clientId,
			startDate: dateRange[0],
			endDate: dateRange[1],
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

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	const onPageChange = (e) => {
		if (e > data.unmatchedHotel.currPosition) {
			history.push(
				`/work-record/${data.unmatchedHotel.nextId}-${recordIndex + 1}`
			)
		} else if (e < data.unmatchedHotel.currPosition) {
			history.push(
				`/work-record/${data.unmatchedHotel.prevId}-${recordIndex - 1}`
			)
		}
	}

	return (
		<PageHeader
			title="Work Record"
			onBack={() => history.push('/unmatched-hotels')}
			extra={[
				<Pagination
					key="pagination"
					simple
					showSizeChanger={false}
					showQuickJumper={false}
					current={data.unmatchedHotel.currPosition}
					total={data.unmatchedHotel.recordCount}
					pageSize={1}
					onChange={onPageChange}
				/>,
			]}
		>
			<Row>
				{getFieldOrder().map((field, i) => {
					return (
						<Statistic
							title={formatTitle(field)}
							key={'field' + i}
							value={data.unmatchedHotel.data[field]}
							style={{
								marginRight: '2em',
								marginBottom: '1em',
							}}
							valueStyle={{ fontSize: '1em' }}
							formatter={(value) =>
								field === 'roomSpend' ? formatNum(value) : value
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
