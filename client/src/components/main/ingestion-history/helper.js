import React from 'react'
import { formatDate } from 'helper'

const getColor = (status) => (status === 'Approved' ? 'green' : 'red')

const Text = ({ type, status, date }) => {
	return (
		<div style={{ color: getColor(status), fontSize: '.8em' }}>
			<span>
				{status ? status.charAt(0).toUpperCase() + status.slice(1) : null} for{' '}
				{type}
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
		dateStatusSourcing
	} = record

	const displayArr = []

	if (isDpm) {
		displayArr.push(
			<Text type={'DPM'} status={statusDpm} date={dateStatusDpm} />
		)
	}
	if (isSourcing) {
		displayArr.push(
			<Text
				type={'Sourcing'}
				status={statusSourcing}
				date={dateStatusSourcing}
			/>
		)
	}

	return displayArr.length
		? displayArr.map((el, i) => ({ ...el, key: i }))
		: 'Open'
}
