import React from 'react'
import { formatDate } from 'helper'
import { Checkbox } from 'antd'

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

export const getActions = (record) => {
	const { isDpm, statusDpm, isSourcing, statusSourcing } = record

	const displayArr = []

	if (
		!isDpm ||
		(!isDpm && isSourcing && statusSourcing.toLowerCase() === 'approved')
	) {
		displayArr.push(<Checkbox>DPM</Checkbox>)
	}
	if (
		!isSourcing ||
		(!isSourcing && isDpm && statusDpm.toLowerCase() === 'approved')
	) {
		displayArr.push(<Checkbox>Sourcing</Checkbox>)
	}

	return displayArr.length ? displayArr.map((el, i) => ({ ...el, key: i })) : []
}
