import React from 'react'
import { formatDate } from 'helper'

const getColor = (status) => (status === 'Approved' ? 'green' : 'red')

const Text = ({ type, status, date }) => {
	return (
		<div style={{ color: getColor(status), fontSize: '.8em' }}>
			<span>
				{status} for {type}
			</span>
			<br />
			<span> {formatDate(date)}</span>
		</div>
	)
}

export const getStatus = (record) => {
	const {
		isDpm,
		statusDpm,
		dateStatusDpm,
		isSourcing,
		statusSourcing,
		dateStatusSourcing,
	} = record

	if (isDpm && !isSourcing) {
		return <Text type={'DPM'} status={statusDpm} date={dateStatusDpm} />
	} else if (isSourcing && !isDpm) {
		return (
			<Text
				type={'Sourcing'}
				status={statusSourcing}
				date={dateStatusSourcing}
			/>
		)
	} else if (isDpm && isSourcing) {
		return (
			<>
				<Text type={'DPM'} status={statusDpm} date={dateStatusDpm} />
				<Text
					type={'Sourcing'}
					status={statusSourcing}
					date={dateStatusSourcing}
				/>
			</>
		)
	} else return 'Open'
}
