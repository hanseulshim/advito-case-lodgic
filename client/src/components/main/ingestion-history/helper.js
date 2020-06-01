import React from 'react'
import { formatDate } from 'helper'
import { Checkbox, Button, Modal } from 'antd'

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
	const loading = statusDpm === 'Loaded' || statusSourcing === 'Loaded'
	const finished = statusDpm === 'Approved' && statusSourcing === 'Approved'

	if (!isDpm && !isSourcing) {
		displayArr.push(<Checkbox>DPM</Checkbox>, <Checkbox>Sourcing</Checkbox>)
	}
	if (isDpm && !loading) {
		displayArr.push(<Checkbox>Sourcing</Checkbox>)
	}
	if (isSourcing && !loading) {
		displayArr.push(<Checkbox>DPM</Checkbox>)
	}
	if (finished) {
		return
	}

	return displayArr.length ? displayArr.map((el, i) => ({ ...el, key: i })) : []
}

export const getBackout = (record) => {
	const { isDpm, statusDpm, isSourcing, statusSourcing } = record
	const showBackout = statusDpm !== 'Approved' && statusSourcing !== 'Approved'
	const loading = statusDpm === 'Loaded' || statusSourcing === 'Loaded'
	const open = !isDpm && !isSourcing

	const warning = () => {
		Modal.warning({
			title: 'This is a warning message',
			content: (
				<div>
					{loading && (
						<>
							<p>
								You are about to backout of file [filename], this is a
								nonreversible action. The following will occur:
							</p>
							<p>
								{' '}
								- All Records for this file will be deleted and removed from
								ingestion history and unmatched screens
							</p>
							<p>
								- 'Loaded' records for all other files that were included in the
								same data load will be deleted (but not the ingested data for
								all other associated files)
							</p>
						</>
					)}
					{open && (
						<p>
							Messaging: you are about to backout of file [filename], this is a
							nonreversible action. The following will occur...
						</p>
					)}
				</div>
			)
		})
	}

	return showBackout ? <Button onClick={warning}>Backout</Button> : null
}
