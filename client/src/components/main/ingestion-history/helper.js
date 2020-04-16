import React from 'react'
import { formatDate } from 'helper'
import { Checkbox, Button } from 'antd'

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

	return displayArr.length ? displayArr : 'Open'
}

export const getActions = (record) => {
	const { isDpm, statusDpm, isSourcing, statusSourcing } = record

	const displayArr = []
	const loading = statusDpm === 'Loaded' || statusSourcing === 'Loaded'

	if (!isDpm && !isSourcing) {
		displayArr.push(<Checkbox>DPM</Checkbox>, <Checkbox>Sourcing</Checkbox>)
	}
	if (isDpm && !loading) {
		displayArr.push(<Checkbox>Sourcing</Checkbox>)
	}
	if (isSourcing && !loading) {
		displayArr.push(<Checkbox>DPM</Checkbox>)
	}

	return displayArr
}

export const getBackout = (record) => {
	const { statusDpm, statusSourcing } = record
	const showBackout = statusDpm !== 'Approved' || statusSourcing !== 'Approved'

	return showBackout ? <Button>Backout</Button> : null
}
