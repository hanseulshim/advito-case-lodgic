import React from 'react'
import { useQuery } from '@apollo/client'
import { PageHeader, Row, Statistic } from 'antd'
import { SpinLoader } from 'components/common/Loader'
import ErrorMessage from 'components/common/ErrorMessage'
import { UNMATCHED_HOTEL } from 'api/queries'

const RecordHeader = ({ recordId }) => {
	const { loading, error, data } = useQuery(UNMATCHED_HOTEL, {
		variables: {
			id: recordId,
		},
		fetchPolicy: 'network-only',
	})

	if (loading) return <SpinLoader />
	if (error) return <ErrorMessage error={error} />

	const formatTitle = (s) => {
		const split = s.replace(/([a-z](?=[A-Z]))/g, '$1 ')
		return split.charAt(0).toUpperCase() + split.slice(1)
	}

	const getFieldOrder = () => {
		return [
			'roomSpend',
			'numberOfNights',
			'hotelName',
			'address1',
			'address2',
			'cityName',
			'stateCode',
			'countryName',
			'phoneNumber',
			'hotelBrandName',
			'hotelChainName',
			'sabrePropertyId',
			'apolloPropertyId',
			'amadeusPropertyId',
			'worldspanPropertyId',
			'lanyonId',
		]
	}

	const formatPhoneNumber = (phone) => {
		const match = phone
			.replace(/\D+/g, '')
			.replace(/^1/, '')
			.match(/([^\d]*\d[^\d]*){1,10}$/)[0]
		const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match
		const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : ''
		const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : ''
		return `${part1}${part2}${part3}`
	}

	return (
		<PageHeader title="Work Record">
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
								field === 'phoneNumber' ? formatPhoneNumber(value) : value
							}
							prefix={field === 'roomSpend' ? '$' : null}
							groupSeparator={field === 'roomSpend' ? ',' : ''}
						/>
					)
				})}
			</Row>
		</PageHeader>
	)
}

export default RecordHeader
